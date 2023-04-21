import scrapy
import re
import os
import datetime
from politik.items import PolitikItem

class KreisGermersheimSpider(scrapy.Spider):
    name = 'kreis_germersheim'

    path = 'Websites/Kreis_Germersheim'

    rel_path = 'Dateien/Kreise/Kreis_Germersheim/'

    base_url = 'http://www.germersheim-kreis.sitzung-online.org/bi/'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kreise/Kreis_Germersheim'
    }

    def start_requests(self):

        for year in range (2009,2023):
            for month in range(1,13):
                url = f"http://www.germersheim-kreis.sitzung-online.org/bi/si010_e.asp?MM={month}&YY={year}"
                yield scrapy.Request(url, callback=self.parse)


    def parse(self, response):
        
        base_url = 'http://www.germersheim-kreis.sitzung-online.org/bi/'

        # headers = {
        #     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        #     'Accept-Encoding': 'gzip, deflate',
        #     'Content-Type': 'application/x-www-form-urlencoded',
        # }

        rows = response.xpath("//tr[@valign='top']")

        for row in rows:
            gremium = 'Kreistag'
            sitzung_gremium = row.xpath("td[5]/a/text()").get()
            if sitzung_gremium is not None:
                if gremium in sitzung_gremium:

                    sitzung_href = row.xpath("td[5]/a/@href").get()
                    
                    if sitzung_href is not None:
                        sitzung_url = self.base_url+ sitzung_href
                        yield scrapy.Request(url=sitzung_url,
                                             callback= self.parse_sitzungen)
        
                    # silfdnr = row.xpath("td[6]/form/input[@type='hidden']/@name").get()
                    # value = row.xpath("td[6]/form/input[@type='hidden']/@value").get()
                    # formdata = {silfdnr: value}

                    # date_url = response.url.split("?")[-1]
                    # date_search = re.findall(r'\d+', date_url)
                    # date = date_search[-1] + '-' + date_search[0] + '-' + row.xpath("td[2]/text()").get()
                    # sitzung_href = row.xpath("td[6]/form/@action").get()
                    # if sitzung_href is not None:
                    #     sitzung_url = base_url + sitzung_href
                    #     yield scrapy.FormRequest(url=sitzung_url, 
                    #                             method='POST',
                    #                             # headers=headers, 
                    #                             formdata=formdata, 
                    #                             callback = self.parse_sitzungen, 
                    #                             cb_kwargs = {'date': date}
                    #                             )



    def parse_sitzungen(self, response):

        base_url = 'http://www.germersheim-kreis.sitzung-online.org/bi/'

        # headers = {
        #     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        #     'Accept-Encoding': 'gzip, deflate',
        #     'Content-Type': 'application/x-www-form-urlencoded',
        #     'Referer': response.url
        # }

        date_original = response.xpath("//td[contains(text(), 'Datum:')]/following-sibling::td/a/text()").get()
        date = datetime.datetime.strptime(date_original, '%d.%m.%Y').strftime('%Y-%m-%d')

        tops = response.xpath("//tr[@class='zl12']|//tr[@class='zl11']")

        for top in tops:

            top_item = PolitikItem()
            
            top_nr = top.xpath("td/a[contains(text(),'Ö')]/text()").get()
            if top_nr is not None:
                top_nr = top_nr.replace("Ö", "").strip()
            
            top_name = ' '.join(top.xpath("td[4]/a/text()").getall())
            vorlage_nr = top.xpath("td[6]/a/text()").get()

            top_item['kommune'] = 'Kreis Germersheim'
            top_item['kommunale_ebene'] = 'Kreis'
            top_item['gremium'] = 'Kreistag'
            top_item['date'] = date
            top_item['top_nr'] = top_nr
            top_item['top_name'] = top_name
            top_item['vorlage_nr'] = vorlage_nr

            # # Vorlage
            # vorlage_href = top.xpath("td[6]/a/@href").get()
            # if vorlage_href is not None:
            #     vorlage_url = base_url + vorlage_href
            #     yield scrapy.Request(url=vorlage_url,
            #                          callback=self.parse_vorlage,
            #                          cb_kwangs={'file_item': top_item})

            # Beschluss
            beschluss_href = top.xpath("td[4]/a/@href").get()
            if beschluss_href is not None:
                beschluss_url = self.base_url + beschluss_href
                yield scrapy.Request(url=beschluss_url,
                                        callback=self.parse_beschluss,
                                        cb_kwargs={'top_item': top_item}
                                        )
                


    def parse_beschluss(self, response, top_item):

        doc_typ = response.xpath("//td[contains(text(), 'Vorlage-Art:')]/following-sibling::td/text()").get()
        status = response.xpath("//td[contains(text(), 'Beschlussart:')]/following-sibling::td/text()").get()
        content_list = response.xpath("//p/span/text()").getall()
        if len(content_list) > 4:
            content = ' '.join(response.xpath("//p/span/text()").getall()).strip()
        else:
            content = None

        top_item['doc_typ'] = doc_typ
        top_item['status'] = status
        top_item['content'] = content

        yield top_item

        kommune = top_item['kommune']
        date = top_item['date']

        # Anlagen
        downloaded = []
        files = response.xpath("//td[@class='text3']/a[contains(@title, '(Öffnet Dokument in neuem Fenster)')]")
        for file in files:
            file_href = file.xpath("@href").get()

            if file_href not in downloaded:
                downloaded.append(file_href)

                file_item = PolitikItem()

                doc_typ = 'Anlage'
                doc_name = file.xpath("text()").get()
                file_urls = self.base_url + file_href
                file_name = file_urls.split('/')[-1]
                pdf_name = f"{date}_{kommune}_{file_name}"
                rel_path_to_file = self.rel_path + pdf_name

                file_item['status'] = status
                file_item['kommune'] = kommune
                file_item['kommunale_ebene'] = top_item['kommunale_ebene']
                file_item['doc_typ'] = doc_typ
                file_item['gremium'] = top_item['gremium']
                file_item['vorlage_nr'] = top_item['vorlage_nr']
                file_item['top_nr'] = top_item['top_nr']
                file_item['top_name'] = top_item['top_name']
                file_item['doc_name'] = doc_name
                file_item['pdf_name'] = pdf_name
                file_item['file_urls'] = [file_urls]
                file_item['rel_path_to_file'] = rel_path_to_file

                yield file_item

        vorlage_href = response.xpath("//td/a[contains(@href, 'VOLFDNR')]/@href").get()
        if vorlage_href is not None:
            vorlage_url = self.base_url + vorlage_href
            yield scrapy.Request(url=vorlage_url,
                                 callback=self.parse_vorlage,
                                 cb_kwargs={'top_item': top_item}
                                 )


    def parse_vorlage(self, response, top_item):

        doc_typ = response.xpath("//td[contains(text(), 'Vorlage-Art:')]/following-sibling::td/text()").get()
        content_list = response.xpath("//p/span/text()").getall()
        if len(content_list) > 4:
            content = ' '.join(response.xpath("//p/span/text()").getall()).strip()
        else:
            content = None

        top_item['doc_typ'] = doc_typ
        top_item['content'] = content

        yield top_item

        kommune = top_item['kommune']
        date = top_item['date']

        # Anlagen
        downloaded = []
        files = response.xpath("//td[@class='text3']/a[contains(@title, '(Öffnet Dokument in neuem Fenster)')]")
        for file in files:
            file_href = file.xpath("@href").get()

            if file_href not in downloaded:
                downloaded.append(file_href)

                file_item = PolitikItem()

                doc_typ = 'Anlage Vorlage'
                doc_name = file.xpath("text()").get()
                file_urls = self.base_url + file_href
                file_name = file_urls.split('/')[-1]
                pdf_name = f"{date}_{kommune}_{file_name}"
                rel_path_to_file = self.rel_path + pdf_name

                file_item['status'] = top_item['status']
                file_item['kommune'] = kommune
                file_item['kommunale_ebene'] = top_item['kommunale_ebene']
                file_item['doc_typ'] = doc_typ
                file_item['gremium'] = top_item['gremium']
                file_item['vorlage_nr'] = top_item['vorlage_nr']
                file_item['top_nr'] = top_item['top_nr']
                file_item['top_name'] = top_item['top_name']
                file_item['doc_name'] = doc_name
                file_item['pdf_name'] = pdf_name
                file_item['file_urls'] = [file_urls]
                file_item['rel_path_to_file'] = rel_path_to_file

                yield file_item




        # table = response.xpath("//tr[@class='zl21']")

        # for row in table:

        #     item = PolitikItem()
                
        #     # Get informations about TOP
        #     top_nr = row.xpath("td[1]/text()").get()
        #     top_nr_search = re.findall(r'\d+', top_nr)
        #     if len(top_nr_search) > 0:
        #         top_nr = top_nr_search[0]
        #     else:
        #         top_nr = 0
                
        #     item['top_nr'] = top_nr
        #     item['date'] = date
        #     item['top_name'] = ' '.join(row.xpath("td[3]/a/text()").getall())
        #     item['vorlage_nr'] = row.xpath("td[5]/a/text()").get()
        #     item['status'] = row.xpath("td[6]/text()").get()

        #     volfdnr = row.xpath("td[4]/form/input[@type='hidden']/@name").get()
        #     value = row.xpath("td[4]/form/input[@type='hidden']/@value").get()
        #     formdata = {volfdnr: value}

        #     top_href = row.xpath("td[4]/form/@action").get()
        #     if top_href is not None:
        #         top_url = base_url + top_href
        #         yield scrapy.FormRequest(url=top_url, 
        #                                 method='POST',
        #                                 headers=headers,
        #                                 formdata=formdata, 
        #                                 callback = self.parse_top, 
        #                                 cb_kwargs = {'item': item}
        #                                 )
 
    # def parse_top(self, response, item):

    #     file_item = PolitikItem()

    #     kommune_clean = 'Kreis Germersheim'
    #     kommunale_ebene = 'Kreis'
    #     gremium = 'Kreistag'

    #     doc_typ = response.xpath("//table[@class='tk1']/tr[2]/td[4]/text()").get()
    #     content = ' '.join(response.xpath("//div/p/span/text()").getall()).replace(u'\xa0', u'')

    #     file_item['kommune'] = kommune_clean
    #     file_item['kommunale_ebene'] = kommunale_ebene
    #     file_item['date'] = item['date']
    #     file_item['id'] = id
    #     file_item['doc_typ'] = doc_typ
    #     file_item['gremium'] = gremium
    #     file_item['vorlage_nr'] = item['vorlage_nr']
    #     file_item['top_nr'] = item['top_nr']
    #     file_item['top_name'] = item['top_name']
    #     file_item['content'] = content

    #     yield file_item