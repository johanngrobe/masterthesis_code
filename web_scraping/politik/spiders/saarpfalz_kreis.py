import scrapy
import re
import os
import locale
import datetime
from politik.items import PolitikItem


class SaarpfalzKreisSpider(scrapy.Spider):
    name = 'saarpfalz_kreis'
    path = 'Websites/Saarpfalz-Kreis'
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    custom_settings = {
        'FILES_STORE': 'Dateien/Kreise/Saarpfalz_Kreis'
    }


    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///' + os.path.join(self.base_dir, self.path, file)
                yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        kommune = 'Saarpfalz_Kreis'
        rel_path = f'Dateien/Kreise/{kommune}/'

        locale.setlocale(locale.LC_TIME, "de_DE")
        files = response.xpath("//div[@class='col-lg-12']/a|//p/a")
        id = 0

        for file in files:
            file_url = file.xpath("@href").get()
            file_ext = os.path.splitext(file_url)[-1] 

            if file_ext == '.pdf':

                gen_item = PolitikItem()

                doc_name = ' '.join(file.xpath("text()").getall()).strip()

                id += 1
                # Im Titel
                date_title = re.findall(r'\d{2}\.\s\w+\s\d{2,4}', doc_name)
                date_title2 = re.findall(r'\w+\s\d{2,4}', doc_name)

                # Im Dateiname(dd_mm_yyyy, dd_mm_yy, dd-mm-yyyy, dd-mm-yy)
                date_file = re.findall(r'\d{2}[-_]\d{2}[-_]\d{2,4}', file_url)


                if len(date_file) > 0:
                    if "_" in date_file[0]:
                        if len(date_file[0]) == 8:
                            date = datetime.datetime.strptime(date_file[0], '%d_%m_%y').strftime('%Y-%m-%d')
                        if len(date_file[0]) == 10:
                            date = datetime.datetime.strptime(date_file[0], '%d_%m_%Y').strftime('%Y-%m-%d')
                    if "-" in date_file[0]:
                        if len(date_file[0]) == 8:
                            date = datetime.datetime.strptime(date_file[0], '%d-%m-%y').strftime('%Y-%m-%d')
                        if len(date_file[0]) == 10:
                            date = datetime.datetime.strptime(date_file[0], '%d-%m-%Y').strftime('%Y-%m-%d')
                elif len(date_title) > 0:
                    date = datetime.datetime.strptime(date_title[0], '%d. %B %Y').strftime('%Y-%m-%d')
                elif len(date_title2) > 0:
                    date = datetime.datetime.strptime(date_title2[0], '%B %Y').strftime('%Y-%m-01')
                else:
                    date = None


                doc_typ = 'Niederschrift'
                file_name = file_url.split('/')[-1]
                pdf_name = file_name
                rel_path_to_file = rel_path + pdf_name

                gen_item['kommune'] = kommune
                gen_item['kommunale_ebene'] = 'Kreis'
                gen_item['gremium'] = 'Kreistag'
                gen_item['date'] = date
                gen_item['id'] = id
                gen_item['doc_typ'] = doc_typ
                gen_item['doc_name'] = doc_name
                gen_item['pdf_name'] = pdf_name
                gen_item['file_urls'] = [file_url]
                gen_item['rel_path_to_file'] = rel_path_to_file

                yield gen_item