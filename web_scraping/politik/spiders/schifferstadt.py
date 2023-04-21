import scrapy
import re
import os
import datetime
from politik.items import PolitikItem
from scrapy_playwright.page import PageMethod

class SchifferstadtSpider(scrapy.Spider):
    name = 'schifferstadt'
    path = '//home/johanngrobe/python_env/politik/Websites/Schifferstadt'

    custom_setting = {
        'FILES_STORE': 'Dateien/Kommune/Schifferstadt'

    }



    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///home/johanngrobe/python_env/politik/Websites/Schifferstadt/' + file
                yield scrapy.Request(url=url, callback=self.parse)



    def parse(self, response):

        sitzungen = response.xpath("//div[@class='calendar-page-day-content']/div/a")

        for sitzung in sitzungen:
            gremium = sitzung.css("div.calendar-page-day-meeting-title::text").get()
            if 'Stadtrat' in gremium:
                sitzung_url = sitzung.xpath("@href").get()
                yield scrapy.http.Request(sitzung_url, 
                                          callback = self.parse_sitzungen,
                                          meta = dict(playwright = True,
                                                    playwright_include_page = True, 
                                                    playwright_page_methods = [PageMethod('wait_for_selector', 'div.tabs-details')],
                                          ),
                                          errback=self.errback_close_page,
                )



    async def parse_sitzungen(self, response):

        page = response.meta["playwright_page"]
    
        kommune = 'Schifferstadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        kommunale_ebene = 'Stadt'

        # dd_mm_yyyy

        date_original = re.findall(r'\d{2}\.\d{2}.\d{4}', response.xpath("//div[@class='meeting-page-header-info']/div/text()").get().strip())
        if len(date_original) > 0:
            date = datetime.datetime.strptime(date_original[0], '%d.%m.%Y').strftime('%Y-%m-%d')
        else:
            date = None
        
        sitzung_info = response.xpath("//div[@class='meeting-page-header-title']/div/text()").get().strip()
        sitzung_nr_find = re.findall(r'\d+', sitzung_info)
        if len(sitzung_nr_find) > 0:
            sitzung_nr = sitzung_nr_find[0]
        else:
            sitzung_nr = None

        gremium = 'Stadtrat'

        # Getting the documents
        id = 0
        vorlage_nr = None
        top_nr = None
        top_name = None
        status = None
        #bekanntmachung = response.xpath("//div[@class='document-attachment meeting-attachment']/div/div/div/div[@role='button']")

        # click button
        gen_doc_header = response.xpath("//div[@class='meeting-documents-header']/text()").get()
        if gen_doc_header is not None:
            if ('Dokumente' in gen_doc_header) or ('Anlagen' in gen_doc_header):
                gen_doc = response.css("div.meeting-attachment")
                meeting_attachments = page.locator("div.meeting-attachment")

                for doc, doc_pw in zip(gen_doc, await meeting_attachments.all()):
                    # doc_pw = meeting_attachments.nth(i)

                    gen_item = PolitikItem()

                    if doc.css("svg::attr(data-icon)").get() == 'file-pdf':
                        doc_name = doc.css("div.document-attachment-name::text").get().strip()
                        if 'Protokoll' in doc_name:
                            doc_typ = 'Niederschrift'
                        elif 'Bekanntmachung' in doc_name:
                            doc_typ = 'Bekanntmachung'
                        else:
                            doc_typ = 'Sitzungsanhang'
                        
                        await doc_pw.locator("div.document-attachment-name[role='button']").click()

                        gen_item['kommune'] = kommune
                        gen_item['kommunale_ebene'] = kommunale_ebene
                        gen_item['doc_typ'] = doc_typ
                        gen_item['date'] = date
                        gen_item['id'] = id
                        gen_item['sitzung_nr'] = sitzung_nr
                        gen_item['gremium'] = gremium
                        gen_item['doc_name'] = doc_name

                        id += 1
                        
                        try:
                            await page.wait_for_selector(".page-text-layer span", timeout=60000)
                            
                            # parse html
                            text = await page.locator("//div[@class='page-text-layer']/span").all_inner_texts()
                            content = ' '.join(text)

                            gen_item['content'] = content
                            
                            yield gen_item
                        except:
                            async with page.expect_download() as download_info:
                                await page.locator(".buttons > div:nth-child(2)").click()
                            download = await download_info.value
                            # Wait for the download process to complete
                            await download.path()
                            # Save downloaded file somewhere
                            suggested_name = download.suggested_filename
                            file_name, file_ext = os.path.splitext(suggested_name) 
                            file_name = file_name.replace(' ', '_').replace('.','')
                            pdf_name = f'{date}_{kommune}_{top_nr}_{id}_{file_name}{file_ext}'
                            rel_path_to_file = f"{rel_path}{pdf_name}"

                            await download.save_as(rel_path_to_file)

                            gen_item['pdf_name'] = pdf_name
                            gen_item['rel_path_to_file'] = rel_path_to_file

                            yield gen_item
                            #await page.wait_for_timeout(3000)
                        
                        await page.locator(".file-viewer-modal-document-close-button").click()

        tops = response.xpath("//div[@class='agenda-item-content']")
        tops_pw = page.locator("//div[@class='agenda-item-content']")

        for top, top_pw in zip(tops, await tops_pw.all()):
            # top_pw = tops_pw.nth(i)

            if len(top.css("div.document-attachment-name")) > 0:

                
                file_item = PolitikItem()

                vorlage_nr = top.css("div.agenda-item-submission-title div:nth-child(2)::text").get()
                if vorlage_nr is not None:
                    vorlage_nr = vorlage_nr.replace(':', '').strip()

                top_nr = top.css("div.agenda-item-number div::text").get()
                top_name = top.xpath(".//div[@class='agenda-item-title']/div/text()").get()

                # Main doc
                main_doc = top.xpath(".//div[@class='agenda-item-documents-main-document']/div[@class='document-attachment']")
                main_doc_pw = top_pw.locator("div.agenda-item-documents-main-document div.document-attachment")
                for doc, doc_pw in zip(main_doc, await main_doc_pw.all()):
                    doc_name = doc.css("div.document-attachment-name::text").get().strip()
                    doc_typ = doc_name

                    if doc.xpath(".//svg/@data-icon").get() == 'file-pdf':
                        await doc_pw.locator("div.document-attachment-name[role='button']").click()

                        file_item = PolitikItem()

                        file_item['kommune'] = kommune
                        file_item['kommunale_ebene'] = kommunale_ebene
                        file_item['date'] = date
                        file_item['id'] = id
                        file_item['doc_name'] = doc_name
                        file_item['doc_typ'] = doc_typ
                        file_item['gremium'] = gremium
                        file_item['vorlage_nr'] = vorlage_nr
                        file_item['top_nr'] = top_nr
                        file_item['top_name'] = top_name

                        id += 1

                        try:
                            await page.wait_for_selector(".page-text-layer span", timeout=60000)

                            text = await page.locator("//div[@class='page-text-layer']/span").all_inner_texts()

                            content = ' '.join(text)

                            file_item['content'] = content

                            yield file_item

                        except:

                            async with page.expect_download() as download_info:
                                await page.locator(".buttons > div:nth-child(2)").click()
                            download = await download_info.value
                            # Wait for the download process to complete
                            await download.path()
                            # Save downloaded file somewhere
                            suggested_name = download.suggested_filename
                            file_name, file_ext = os.path.splitext(suggested_name) 
                            file_name = file_name.replace(' ', '_').replace('.','')
                            pdf_name = f'{date}_{kommune}_{top_nr}_{id}_{file_name}{file_ext}'
                            rel_path_to_file = f"{rel_path}{pdf_name}"

                            await download.save_as(rel_path_to_file)

                            file_item['pdf_name'] = pdf_name
                            file_item['rel_path_to_file'] = rel_path_to_file

                            yield file_item
                            # await page.wait_for_timeout(10000)

                        await page.locator(".file-viewer-modal-document-close-button").click()

                # Attachment
                attachments = top.xpath(".//div[@class='agenda-item-documents-attachments']//div[@class='document-attachment-content']")
                attachments_pw = top_pw.locator("div.agenda-item-documents-attachments div.agenda-item-documents-attachment")
                for attachment, attachment_pw in zip(attachments, await attachments_pw.all()):
                    doc_name = attachment.css("div.document-attachment-name::text").get().strip()
                    doc_typ = 'TOP Anhang'

                    if attachment.xpath(".//svg/@data-icon").get() == 'file-pdf':
                        await attachment_pw.locator("div.document-attachment-name[role='button']").click()

                        file_item = PolitikItem()
                        
                        file_item['kommune'] = kommune
                        file_item['kommunale_ebene'] = kommunale_ebene
                        file_item['date'] = date
                        file_item['id'] = id
                        file_item['doc_name'] = doc_name
                        file_item['doc_typ'] = doc_typ
                        file_item['gremium'] = gremium
                        file_item['vorlage_nr'] = vorlage_nr
                        file_item['top_nr'] = top_nr
                        file_item['top_name'] = top_name

                        id += 1


                        try:
                            await page.wait_for_selector(".page-text-layer span", timeout=60000)

                            text = await page.locator("//div[@class='page-text-layer']/span").all_inner_texts()

                            content = ' '.join(text)

                            file_item['content'] = content

                            yield file_item

                        except:
                            async with page.expect_download() as download_info:
                                await page.locator(".buttons > div:nth-child(2)").click()
                            download = await download_info.value
                            # Wait for the download process to complete
                            await download.path()
                            # Save downloaded file somewhere
                            suggested_name = download.suggested_filename
                            file_name, file_ext = os.path.splitext(suggested_name) 
                            file_name = file_name.replace(' ', '_').replace('.','')
                            pdf_name = f'{date}_{kommune}_{top_nr}_{id}_{file_name}{file_ext}'
                            rel_path_to_file = f"{rel_path}{pdf_name}"

                            await download.save_as(rel_path_to_file)

                            file_item['pdf_name'] = pdf_name
                            file_item['rel_path_to_file'] = rel_path_to_file

                            yield file_item
                            #await page.wait_for_timeout(3000)

                        await page.locator(".file-viewer-modal-document-close-button").click()


        await page.close()


    async def errback_close_page(self, failure):
            page = failure.request.meta["playwright_page"]
            await page.close()