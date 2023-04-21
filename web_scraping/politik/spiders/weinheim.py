import scrapy
import datetime
import locale
import re
from politik.items import PolitikItem

class WeinheimSpider(scrapy.Spider):
    name = 'weinheim'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Weinheim'
    }

    def start_requests(self):

        ergebnisse_url = 'https://www.weinheim.de/startseite/buergerservice/gr_beratungsergebnisse.html'

        unterlagen_url = 'https://www.weinheim.de/startseite/buergerservice/tagesordnung_sitzungsunterlagen_gr.html'

        yield scrapy.Request(url=ergebnisse_url, callback=self.parse_ergebnisse)

        yield scrapy.Request(url=unterlagen_url, callback=self.parse_unterlagen)
    
    def parse_ergebnisse(self, response):

        kommune = 'Weinheim'

        kommunale_ebene = 'Stadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        base_url = 'https://www.weinheim.de'
        
        gremium = 'Gemeinderat'

        locale.setlocale(locale.LC_TIME, "de_DE")

        files = response.xpath("//a[@class='pdfLink dateiLink linkTyp_pdf neuFensterLink']")

        id = 0
        vorlage_nr = None
        top_nr = None
        top_name = None
        status = None
        sitzung_nr = None
        
        for file in files:

            try:

                gen_item = PolitikItem()

                doc_name = file.css("::text").get()

                date_original = re.findall(r'\d{2}\.\s[äöüÄÖÜß\w]+\s\d{4}', doc_name)
                if len(date_original) > 0:
                    date = datetime.datetime.strptime(date_original[0], '%d. %B %Y').strftime('%Y-%m-%d')
                else:
                    date = None

                id += 1

                doc_typ = 'Beratungsergebnisse'
                file_name = file.xpath("@href").get().split('/')[-1]
                file_urls = base_url + file.xpath("@href").get()
                pdf_name = f'{date}_{kommune}_{id}_{file_name}'
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

    def parse_unterlagen(self, response):

        kommune = 'Weinheim'
        kommunale_ebene = 'Stadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        base_url = 'https://www.weinheim.de'
        
        gremium = 'Gemeinderat'

        files = response.xpath("//a[@class='pdfLink dateiLink linkTyp_pdf neuFensterLink']")

        id = 0
        vorlage_nr = None
        top_nr = None
        top_name = None
        status = None
        sitzung_nr = None
        
        for file in files:

            try:

                gen_item = PolitikItem()

                doc_name = file.css("::text").get()

                locale.setlocale(locale.LC_TIME, "de_DE")
                date_original = re.findall(r'\d{2}\.\s[äöüÄÖÜß\w]+\s\d{4}', doc_name)
                if len(date_original) > 0:
                    date = datetime.datetime.strptime(date_original[0], '%d. %B %Y').strftime('%Y-%m-%d')
                else:
                    date = None

                id += 1

                doc_typ = 'Sitzungsunterlagen'
                file_name = file.xpath("@href").get().split('/')[-1]
                file_urls = base_url + file.xpath("@href").get()
                pdf_name = f'{date}_{kommune}_{id}_{file_name}'
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