import scrapy
import re
import os
import datetime
from politik.items import PolitikItem

class WieslochSpider(scrapy.Spider):
    name = 'wiesloch'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Wiesloch'
    }

    path = r'Websites/Wiesloch'
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///' + os.path.join(self.base_dir, self.path, file)
                yield scrapy.Request(url=url, callback=self.parse)

                  

    def parse(self, response):

        sitzungen = response.xpath("//div[@class='mbsc-event-txt']/a/@href").getall()

        for sitzung in sitzungen:
            yield scrapy.http.Request(sitzung, callback = self.parse_sitzungen)


    def parse_sitzungen(self, response):

        kommune = 'Wiesloch'

        rel_path = F'Dateien/Kommunen/{kommune}/'

        kommunale_ebene = 'Stadt'

        date_original = re.findall(r'\d{2}\.\d{2}\.\d{4}', response.xpath("//div[@class='inner-wrapper']/h1/text()").get())
        if len(date_original) > 0:
            date = datetime.datetime.strptime(date_original[0], '%d.%m.%Y').strftime('%Y-%m-%d')
        else:
            date = None

        gremium = 'Gemeinderat'
        sitzung_nr = None
        vorlage_nr = None
        top_nr = None
        top_name = None
        status = None

        # Getting the documents
        id = 0

        generel_documents = response.xpath("//a[@class='list-group-item rp-result document-link']")

        for generel_document in generel_documents:
                
            try:
            
                gen_item = PolitikItem()

                id += 1

                doc_typ = generel_document.xpath("@title").get()
                doc_name = doc_typ
                file_urls = generel_document.xpath("@data-href").get()
                pdf_name = f'{date}_{kommune}_{id}.pdf'
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

        rows = response.xpath("//div[@class='list-group-item rp-result rp-session-top-result ']")
        
        for row in rows:
            # Nur wenn > 1, dann sind Dateien verlinkt
            if len(row.xpath("div/div/div/ul/li/div/div/ul/li/a[@class='document-link']")) > 0:
                
                # Get informations about TOP
                top_nr = row.xpath("div/div[@class='rp-session-top-number']/text()").get().strip().replace('.', '')
                top_name = " ".join(row.xpath("div/h3/a/text()").getall()).strip()

                files = row.xpath("div/div/div/ul/li/div/div/ul/li/a[@class='document-link']")

                for file in files:
                        
                    try:
                    
                        file_item = PolitikItem()

                        id += 1

                        # Bestimmung des Dokumententyps
                        doc_typ = file.xpath("@data-type").get()
                    
                        
                        # Weitere Meta-Daten über das Dokument
                        doc_name = file.xpath("text()").get().strip()
                        file_urls = file.xpath("@data-href").get()
                        pdf_name = f'{date}_{kommune}_{id}.pdf'
                        rel_path_to_file = rel_path + pdf_name

                        file_item['kommune'] = kommune
                        file_item['kommunale_ebene'] = kommunale_ebene
                        file_item['date'] = date
                        file_item['id'] = id
                        file_item['doc_typ'] = doc_typ
                        file_item['sitzung_nr'] = sitzung_nr
                        file_item['gremium'] = gremium
                        file_item['vorlage_nr'] = vorlage_nr
                        file_item['top_nr'] = top_nr
                        file_item['top_name'] = top_name
                        file_item['doc_name'] = doc_name
                        file_item['pdf_name'] = pdf_name
                        file_item['file_urls'] = [file_urls]
                        file_item['rel_path_to_file'] = rel_path_to_file

                        yield file_item

                    except:
                        pass