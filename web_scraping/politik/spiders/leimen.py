import scrapy
import re
import os
import datetime
from politik.items import PolitikItem

class LeimenSpider(scrapy.Spider):
    name = 'leimen'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Leimen'
    }

    path = r'Websites/Leimen'
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///' + os.path.join(self.base_dir, self.path, file)
                yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        
        kommune = 'Leimen'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        base_url = 'leimen.de'

        kommunale_ebene = 'Stadt'

        # dd_mm_yyyy
        original_date = ''.join(response.xpath("//div[@class='datum']/text()").getall()).strip()
        date = datetime.datetime.strptime(original_date, '%d.%m.%Y').strftime('%Y-%m-%d')

        gremium = response.xpath("//div[@class='gremium']/a/text()").get()

        # Getting the documents
        id = 0
        vorlage_nr = None
        top_nr = None
        top_name = None
        status = None
        sitzung_nr = None
        
        # Niederschriften

        niederschriften = response.xpath("//div[@class='datei niederschriften']/ul/li/a")

        if len(niederschriften) > 0:

            for doc in niederschriften:

                try:

                    gen_item = PolitikItem()

                    id += 1

                    doc_typ = 'Niederschrift'
                    doc_name = doc.xpath("text()").get().strip()
                    file_urls = doc.xpath("@href").get()
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

        # Sitzungsunterlagen

        sitzungsunterlagen = response.xpath("//div[@class='datei sitzungsunterlagen']/ul/li/a")
        
        if len(sitzungsunterlagen) > 0:
            for doc in sitzungsunterlagen:
                    
                try:

                    gen_item = PolitikItem()

                    id += 1

                    doc_typ = 'Sitzungenunterlagen'
                    doc_name = doc.xpath("text()").get().strip()
                    file_urls = doc.xpath("@href").get()
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


        # Protokollunterlagen

        protokollunterlagen = response.xpath("//div[@class='datei protokollunterlagen']/ul/li/a")

        if len(protokollunterlagen) > 0:
            for doc in protokollunterlagen:

                try:

                    gen_item = PolitikItem()

                    id += 1

                    doc_typ = 'Protokollunterlagen'
                    doc_name = doc.xpath("text()").get().strip()
                    file_urls = doc.xpath("@href").get()
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