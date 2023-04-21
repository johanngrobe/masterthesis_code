import scrapy
import datetime
import locale
import re
from politik.items import PolitikItem

class BensheimSpiderSpider(scrapy.Spider):
    name = 'bensheim'
    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Bensheim'
    }

    start_urls = ['https://www.bensheim.de/rathaus-politik/politik/stvv']

    def parse(self, response):

        locale.setlocale(locale.LC_TIME, "de_DE")

        kommune = 'Bensheim'
        kommunale_ebene = 'Stadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'
    

        gremium = 'Stadtverordnetenversammlung'
        id = 0

        panels = response.xpath("//div[@class='panel panel-default']")

        for panel in panels:
            year = panel.xpath("div/h4/a/span/text()").get()
        
            pdf_documents = panel.xpath("div/div/div/ul/li/a")


            for pdf_document in pdf_documents:

                try:

                    file_item = PolitikItem()
                    
                    get_month = pdf_document.xpath("@title").get().strip()
                    if len(re.findall(r'\d{2}\.\s\w+\s\d{4}', get_month)) > 0:
                        date = datetime.datetime.strptime(f'{get_month}', '%d. %B %Y').strftime('%Y-%m-%d')
                    else:
                        date = datetime.datetime.strptime(f'{get_month} {year}', '%B %Y').strftime('%Y-%m-01')

                    file_name = pdf_document.xpath("@href").get()
                    doc_name = file_name.split('/')[-1]
                    doc_typ = 'Niederschrift'
                    file_urls = response.urljoin(file_name)
                    pdf_name = f"{date}_{kommune}_{doc_name}.pdf"
                    rel_path_to_file = rel_path + pdf_name


                    file_item['kommune'] = kommune
                    file_item['kommunale_ebene'] = kommunale_ebene
                    file_item['date'] = date
                    file_item['id'] = id
                    file_item['doc_typ'] = doc_typ
                    file_item['gremium'] = gremium
                    file_item['doc_name'] = doc_name
                    file_item['pdf_name'] = pdf_name
                    file_item['file_urls'] = [file_urls]
                    file_item['rel_path_to_file'] = rel_path_to_file

                    id += 1

                    yield file_item
                
                except:
                    pass

                