import scrapy
import re
import os
import datetime
import locale
from politik.items import PolitikItem


class HomburgSpider(scrapy.Spider):
    name = 'homburg'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Homburg'
    }

    path = r'Websites/Homburg'
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///' + os.path.join(self.base_dir, self.path, file)
                yield scrapy.Request(url=url, callback=self.parse_sitzungen)


    def parse_sitzungen(self, response):

        kommune = 'Homburg'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        kommunale_ebene = 'Stadt'

        # Allgemeine Sitzungsinformationen

        locale.setlocale(locale.LC_TIME, "de_DE")
        original_date = response.xpath("//span[@id='sidatum']/a/text()").get()
        date = datetime.datetime.strptime(original_date, '%a, %d.%m.%Y').strftime('%Y-%m-%d')

        gremium = response.xpath("//span[@id='sigremium']/a/text()").get()
        sitzung_nr = None

        # Getting the documents

        generel_documents = response.xpath("//a[@class='js-simple-tooltip doclink pdf']")

        for generel_document in generel_documents:
            
            try:
            
                gen_item = PolitikItem()

                vorlage_nr = None
                top_nr = None
                top_name = None
                status = None
                doc_typ = generel_document.xpath("text()").get().strip()
                file_urls = generel_document.xpath("@href").get()
                doc_name_parts = os.path.splitext(file_urls)
                doc_name = doc_typ
                file_ext = doc_name_parts[-1]
                id = re.findall(r'\d+', doc_name_parts[0].split('/')[-1])[0]
                pdf_name = f'{date}_{kommune}_{id}_{doc_name}{file_ext}'
                rel_path_to_file = rel_path + pdf_name

                gen_item['kommune'] = kommune
                gen_item['kommunale_ebene'] = kommunale_ebene
                gen_item['date'] = date
                gen_item['id'] = id
                gen_item['doc_typ'] = doc_typ
                gen_item['sitzung_nr'] = sitzung_nr
                gen_item['gremium'] = gremium
                gen_item['vorlage_nr'] = vorlage_nr
                gen_item['top_nr'] = top_nr
                gen_item['top_name'] = top_name
                gen_item['status'] = status
                gen_item['doc_name'] = doc_name
                gen_item['pdf_name'] = pdf_name
                gen_item['file_urls'] = [file_urls]
                gen_item['rel_path_to_file'] = rel_path_to_file

                yield gen_item
            
            except:
                pass

        rows = response.xpath("//table[@class='dataTable captionVisible stickyHeader toTable']/tbody/tr")
        
        for row in rows:
            
            file_item = PolitikItem()

            # Get informations about TOP
            vorlage_nr = row.xpath("td[@class='tovonr']/div/a/text()").get()
                
            betreff_url = row.xpath("td[@class='tobetreff']/div/a/@href").get()
            
            file_item['kommune'] = kommune
            file_item['kommunale_ebene'] = kommunale_ebene
            file_item['gremium'] = gremium
            file_item['date'] = date
            file_item['sitzung_nr'] = sitzung_nr
            file_item['vorlage_nr'] = vorlage_nr

            if betreff_url != None:
                yield scrapy.http.Request(betreff_url, callback = self.parse_top, cb_kwargs = {'file_item': file_item,})


    def parse_top(self, response, file_item):

        kommune = 'Homburg'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        try:

            doc_typ = response.xpath("//span[@id='voart']/text()").get()
            status = response.xpath("//span[@id='toBeschlussart']/text()").get()
            top_nr = response.xpath("//span[@id='toname']/text()").get().replace('Ö', '').strip()
            top_name = response.xpath("//div[@id='vobetreff']/a/p/text()").get()
            sammeldokuemnt = response.xpath("//a[contains(text(), 'Sammeldokument')]")
            file_urls = sammeldokuemnt.xpath("@href").get()
            doc_name_parts = os.path.splitext(file_urls)
            doc_name = top_name
            file_ext = doc_name_parts[-1]
            id = re.findall(r'\d+', doc_name_parts[0].split('/')[-1])[0]
            content = ''.join(response.xpath("//div[@class='docPart']/div/div/p/span/text()").getall())
            pdf_name = f"{file_item['date']}_{file_item['kommune']}_{id}_{top_nr}{file_ext}"
            rel_path_to_file = rel_path + pdf_name

            file_item['doc_typ'] = doc_typ
            file_item['status'] = status
            file_item['id'] = id
            file_item['top_nr'] = top_nr
            file_item['top_name'] = top_name
            file_item['doc_name'] = doc_name
            file_item['pdf_name'] = pdf_name
            file_item['file_urls'] = [file_urls]
            file_item['rel_path_to_file'] = rel_path_to_file
            file_item['content'] = content

            yield file_item

        except:
            pass