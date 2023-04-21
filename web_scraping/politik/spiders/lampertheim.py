import scrapy
import re
import os
import locale
import datetime
from politik.items import PolitikItem

class LampertheimSpider(scrapy.Spider):
    name = 'lampertheim'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Lampertheim'
    }
    start_urls = [#'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZS60qrbFKR7dqKi6yBNGwNy3WpK4KO6WK5YZ-sAXP3W3',
                   'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZTDmAZkJo62ht1W9K8tin9GWEr7WACWhdsWh74VExnBU',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZTEMMUL6C0lz-s1lqTImjfu0HkKO7Bg4zShdu1OVtQLQ',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZWIvnW8qtfOGuNBKbokvN7FNIhfUl4e3dcPINA4FALSL',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZeVhwW-jQWASltgrz7K3f35LuIWEMr10LecbIDFZPK_6',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZeVhwW-jQWASltgrz7K3f35LuIWEMr10LecbIDFZPK_6',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZWloLruocISJgh28fBYozZrKzSybYJ_-yID8nblBJKif',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZeV457sLFl-vuoZyDKRlQVFIuYiVyw7orjR3b-0LJKRv',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZZb8pn3OGsg0wwWfSIa2A46b6kCvw8LYiLbUk2-8Z1Ch',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZQaWyugjVSKqbUx99MLOy_2WuiDOOGZob9fWIPWiK9S8',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZYD1gBG9dOreMj_D5H25hq0v1Ys_2h_K-oa2Xnpjo2rS',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZfFMOURmLFa63TGm6lp-xRSL-CvWfHyh4Y-ouFm4sI_i',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZYRGDe3W4K8F_0_RvSwNd97XR6r4EwrOwzvhQdEi7t1t',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZYDYhe1mQohQBFEMrq1n7OjW5mA9Gg3eZQSIQ17Azr57',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZZJZhDIDL6bWsQYI2QmLfnKZKVujaEphlY-Aw4gj8AfM',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZY5JKR3Z1PXb4KlU5ssbeFZzX_KHEumKMgv6UvwDWG08',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZQJevW6AodnCNZnxMiHJrv4RoJVIvpJz2l5gtYPmLb1b',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZWx3v8qmWF3oLs_okhC5eaJbCQplvYQWU9rLk-9aisBw',
                  'https://rim.ekom21.de/lampertheim/termine?__=UGhVM0hpd2NXNFdFcExjZSuARNhEHAgW08egM28DuGVbR3BHbhMOT-7mRyHOJYAn',
    ]

                  

    def parse(self, response):

        sitzungen = response.xpath("//tbody/tr")

        stvv = 'Stadtverordnetenversammlung'

        for sitzung in sitzungen:

            gremium_sitzung = sitzung.xpath("td[@class='column-uebersicht']/text()").get()
            
            # Wenn Stadtverordnetensitzung, dann weiter scrapen
            if stvv in gremium_sitzung:
                sitzung_url = sitzung.xpath("td[@class='column-termin']/a/@href").get()
                yield scrapy.http.Request(sitzung_url, callback = self.parse_sitzungen)



    def parse_sitzungen(self, response):

        kommune = 'Lampertheim'

        kommunale_ebene = 'Stadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        # Allgemeine Sitzungsinformationen

        generel_info = response.xpath("//table[@class='table-details']")

        # dd_mm_yyyy
        original_date = response.xpath("//a[@title='Zur Sitzung']/text()").get().split(' ')[1]
        date = datetime.datetime.strptime(original_date, '%d.%m.%Y').strftime('%Y-%m-%d')
        
        sitzung_info = generel_info.xpath("tr[1]/td/text()").getall()[1]
        sitzung_nr = re.findall(r'\d+', sitzung_info)[0]
        
        
        gremium = generel_info.xpath("tr[1]/td/a/text()").get()

        # Getting the documents

        try:
            gen_item = PolitikItem()

            # Niederschrift
            id = 0
            vorlage_nr = None
            top_nr = None
            top_name = None
            status = None
            doc_name = generel_info.xpath("//td[@class='document-icon-margin']/a/@href").get().split('/')[-1].replace('_', ' ')
            doc_typ = doc_name.split(".")[0]
            file_urls = generel_info.xpath("//td[@class='document-icon-margin']/a/@href").get()
            file_name = file_urls.split('/')[-1]
            pdf_name = f"{date}_{file_name}"
            rel_path_to_file = rel_path + pdf_name

            gen_item['kommune'] = kommune
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

        rows = response.xpath("//table[@class='table-data table-top table-cols-4']/tbody/tr")
        
        for row in rows:
            
            # Nur wenn > 1, dann sind Dateien verlinkt
            if len(row.xpath("td[@class='column-dokumente']/a")) > 1:

                id += 20
                
                # Get informations about TOP
                vorlage_nr = row.xpath("td[@class='column-nummer']/text()").get()
                top_nr = row.xpath("td[@class='column-topnrtext']/text()").get()
                top_name = ' '.join(row.xpath("td[@class='column-bezeichnung']/text()").getall())
                    
                file_item = PolitikItem()
                    
                vorgang_url = row.xpath("td/a/span[@class='vorgang-link fa-sst-folder-open fa-icon']/parent::a/@href").get()

                file_item['kommune'] = kommune
                file_item['kommunale_ebene'] = kommunale_ebene
                file_item['date'] = date
                file_item['id'] = id
                file_item['sitzung_nr'] = sitzung_nr
                file_item['gremium'] = gremium
                file_item['vorlage_nr'] = vorlage_nr
                file_item['top_nr'] = top_nr
                file_item['top_name'] = top_name


                yield scrapy.http.Request(vorgang_url, callback = self.parse_status, cb_kwargs = {'file_item': file_item})


    def parse_status(self, response, file_item):

        rel_path = 'Dateien/Kommunen/Lampertheim/'

        id = file_item['id']
        date = file_item['date']
        kommune = file_item['kommune']

        table = response.xpath("//table[@class='table-data table-vorgang table-cols-4']/tbody/tr")
        status = None

        for row in table:
            if row.xpath("td[@class='column-gremium']/a/span/text()").get() == 'Stadtverordnetenversammlung':

                status = row.xpath("td[@class='column-ergebnis']/text()").get()
                
                doc_beschluss = row.xpath("td[@class='column-beschluss']/a")
                for doc in doc_beschluss:

                    try:

                        doc_item = PolitikItem()

                        id += 1
                        
                        doc_typ_class = doc.xpath("span/@class").get()
                        doc_typ = None
                
                        match doc_typ_class:
                            case 'document-link fa-sst-file vorlage-link fa-icon':
                                doc_typ = 'Vorlage'
                            case 'attachment-link vorlage-attachment-link fa-icon':
                                doc_typ = 'Vorlage Anhang'
                            case 'document-link fa-sst-file beschluss-link fa-icon':
                                doc_typ = 'Beschluss'
                            case 'attachment-link beschluss-attachment-link fa-icon':
                                doc_typ = 'Beschluss Anhang'

                        doc_name = doc.xpath("@aria-label").get().replace(" im PDF-Format öffnen", '')
                        file_urls = doc.xpath("@href").get()
                        file_name = file_urls.split('/')[-1]
                        pdf_name = f"{date}_{kommune}_{file_name}"
                        rel_path_to_file = rel_path + pdf_name
                            

                        doc_item['status'] = status
                        doc_item['kommune'] = file_item['kommune']
                        doc_item['kommunale_ebene'] = file_item['kommunale_ebene']
                        doc_item['date'] = file_item['date']
                        doc_item['id'] = id
                        doc_item['doc_typ'] = doc_typ
                        doc_item['sitzung_nr'] = file_item['sitzung_nr']
                        doc_item['gremium'] = file_item['gremium']
                        doc_item['vorlage_nr'] = file_item['vorlage_nr']
                        doc_item['top_nr'] = file_item['top_nr']
                        doc_item['top_name'] = file_item['top_name']
                        doc_item['doc_name'] = doc_name
                        doc_item['pdf_name'] = pdf_name
                        doc_item['file_urls'] = [file_urls]
                        doc_item['rel_path_to_file'] = rel_path_to_file

                        yield doc_item

                    except:
                        pass

        files = response.xpath("//table[@class='table-details']/tr/td/a[contains(@href,'pdf')]")

        for file in files:

            try:

                doc_item = PolitikItem()

                id += 1
                
                # Bestimmung des Dokumententyps
                doc_typ_class = file.xpath("span/@class").get()
                doc_typ = None
                
                match doc_typ_class:
                    case 'document-link fa-sst-file vorlage-link fa-icon':
                        doc_typ = 'Vorlage'
                    case 'attachment-link vorlage-attachment-link fa-icon':
                        doc_typ = 'Vorlage Anhang'
                    case 'document-link fa-sst-file beschluss-link fa-icon':
                        doc_typ = 'Beschluss'
                    case 'attachment-link beschluss-attachment-link fa-icon':
                        doc_typ = 'Beschluss Anhang'
                    
                # Weitere Meta-Daten über das Dokument
                doc_name = file.xpath("@aria-label").get().replace(" im PDF-Format öffnen", '')
                file_urls = file.xpath("@href").get()
                file_name = file_urls.split('/')[-1]
                pdf_name = f"{date}_{kommune}_{file_name}"
                rel_path_to_file = rel_path + pdf_name


                doc_item['status'] = status
                doc_item['kommune'] = kommune
                doc_item['kommunale_ebene'] = file_item['kommunale_ebene']
                doc_item['date'] = date
                doc_item['id'] = id
                doc_item['doc_typ'] = doc_typ
                doc_item['sitzung_nr'] = file_item['sitzung_nr']
                doc_item['gremium'] = file_item['gremium']
                doc_item['vorlage_nr'] = file_item['vorlage_nr']
                doc_item['top_nr'] = file_item['top_nr']
                doc_item['top_name'] = file_item['top_name']
                doc_item['doc_name'] = doc_name
                doc_item['pdf_name'] = pdf_name
                doc_item['file_urls'] = [file_urls]
                doc_item['rel_path_to_file'] = rel_path_to_file

                yield doc_item
                
            except:
                pass