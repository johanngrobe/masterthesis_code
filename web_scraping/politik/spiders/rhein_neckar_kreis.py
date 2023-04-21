import scrapy
import re
import os
import locale
import datetime
from politik.items import PolitikItem


class RheinNeckarKreisSpider(scrapy.Spider):
    name = 'rhein_neckar_kreis'
    path = 'Websites/Rhein-Neckar_Kreis'
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    
    custom_settings = {
        'FILES_STORE': 'Dateien/Kreise/Rhein_Neckar_Kreis',
        'DOWNLOADER_CLIENTCONTEXTFACTORY': 'politik.contextfactory.LegacyConnectContextFactory',
    }


    def start_requests(self):

        # Alle Dateien in dem Ordner werden gecrawlt
        for file in os.listdir(self.path):
            
            # Nur Dateien mit der Endung .htm werden gecrawlt
            if os.path.splitext(file)[-1] == '.htm':
                url = 'file:///' + os.path.join(self.base_dir, self.path, file)
                yield scrapy.Request(url=url, callback=self.parse)

                  

    def parse(self, response):

        sitzungen = response.xpath("//div[@class='sstfc-titleHint-display']/a/@href").getall()

        for sitzung in sitzungen:
            yield scrapy.http.Request(sitzung, callback = self.parse_sitzungen)


    def parse_sitzungen(self, response):

        kommune = 'Rhein_Neckar_Kreis'

        kommunale_ebene = 'Kreis'

        rel_path = 'Dateien/Kreis/' + kommune + '/'
        locale.setlocale(locale.LC_TIME, "de_DE")

        # Allgemeine Sitzungsinformationen
        generel_info = response.xpath("//table[@class='table-details']")

        date_original = response.xpath("//a[@title='Zur Sitzung']/text()").get()
        date = datetime.datetime.strptime(date_original, '%a, %d.%m.%Y %M:%H Uhr').strftime('%Y-%m-%d')
        
        sitzung_info = generel_info.xpath("tr[1]/td/text()").getall()[1]
        sitzung_nr_find = re.findall(r'\d+', sitzung_info)
        if len(sitzung_nr_find) == 0:
            sitzung_nr = None
        else:
            sitzung_nr = sitzung_nr_find[0]

        
        
        gremium = generel_info.xpath("tr[1]/td/a/text()").get()

        # Getting the documents
        id = 0

        generel_documents = generel_info.xpath("tr/td/a[contains(@href,'pdf')]")

        for generel_document in generel_documents:
            
            try:
                gen_item = PolitikItem()

                id += 1
                doc_typ = generel_document.xpath("../../th/text()").get().replace(':', '')
                doc_name = generel_document.xpath("@title").get().replace(' im PDF-Format öffnen', '')
                file_urls = generel_document.xpath("@href").get()
                file_name = file_urls.split('/')[-1]
                pdf_name = f"{date}_{kommune}_{id}_{file_name}"
                rel_path_to_file = rel_path + pdf_name

                gen_item['kommune'] = kommune
                gen_item['kommunale_ebene'] = kommunale_ebene
                gen_item['date'] = date
                gen_item['id'] = id
                gen_item['doc_typ'] = doc_typ
                gen_item['sitzung_nr'] = sitzung_nr
                gen_item['gremium'] = gremium
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

        rel_path = 'Dateien/Kreis/Rhein-Neckar-Kreis/'

        id = file_item['id']
        date = file_item['date']
        kommune = file_item['kommune']

        table = response.xpath("//table[@class='table-data table-vorgang table-cols-4']/tbody/tr")
        status = None

        for row in table:
            if row.xpath("td[@class='column-gremium']/a/span/text()").get() == 'Kreistag':

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
                        pdf_name = f"{date}_{kommune}_{id}_{file_name}"
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

        files = response.xpath("//table[@class='table-details']/tr/td/a[contains(@href,'pdf')]")

        for file in files:
            try:

                doc_item = PolitikItem()

                id += 1
                
                # Bestimmung des Dokumententyps
                doc_typ_class = file.xpath("span/@class").get()
                
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
                doc_name = file.xpath("@title").get().replace(" im PDF-Format öffnen", '')
                file_urls = file.xpath("@href").get()
                file_name = file_urls.split('/')[-1]
                pdf_name = f"{date}_{kommune}_{id}_{file_name}"
                rel_path_to_file = rel_path + pdf_name


                table = response.xpath("//table[@class='table-data table-vorgang table-cols-4']/tbody/tr")
                status = None

                for row in table:
                    if row.xpath("td[@class='column-gremium']//a//span/text()").get() == 'Kreistag':
                        status = row.xpath("td[@class='column-ergebnis']/text()").get()

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