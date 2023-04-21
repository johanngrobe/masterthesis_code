import scrapy
import datetime
from politik.items import PolitikItem


class FrankenthalSpider(scrapy.Spider):
    name = 'frankenthal'

    custom_settings = {
        'FILES_STORE': 'Dateien/Kommunen/Frankenthal'
    }
    
    urls = []
    
    for date in range (2004,2023):
        crawl_url = "https://buergerdienste.frankenthal.de:8002/bi/si0046.asp?__cjahr={}&__cmonat=1&__canz=12&smccont=85&__osidat=d&__kgsgrnr=1&__cselect=65536".format(date)
        urls.append(crawl_url)
    start_urls = urls
    

    def parse(self, response):

        base_url = 'https://buergerdienste.frankenthal.de:8002/bi/'
        sitzungen = response.xpath("//a[@class='smce-a-u smc-link-normal smc_doc smc_datatype_si']/@href").getall()

        for sitzung in sitzungen:
            sitzung_url = base_url + sitzung
            yield scrapy.http.Request(sitzung_url, callback = self.parse_sitzungen)



    def parse_sitzungen(self, response):

        base_url = 'https://buergerdienste.frankenthal.de:8002/bi/'

        kommune = 'Frankenthal'

        kommunale_ebene = 'Kreisfreie Stadt'

        rel_path = f'Dateien/Kommunen/{kommune}/'

        # Allgemeine Sitzungsinformationen

        # dd_mm_yyyy
        original_date = response.xpath("//div[@class='smc-dg-td-2 smc-table-cell sidat']/text()").get()
        date = datetime.datetime.strptime(original_date, '%d.%m.%Y').strftime('%Y-%m-%d')

        sitzung_nr = response.xpath("//div[@class='smc-dg-td-2 smc-table-cell siname']/text()").get().replace('/', "-")
        gremium = response.xpath("//div[@class='smc-dg-td-2 smc-table-cell sigrname']/text()").get()


        # Getting the documents
        generel_documents = response.xpath("//div[@class='smc-dg-c-1-10 smc-documents smc-pr-n row']/div/div/div/div/a[@class='smce-a-u smc-t-r991']")

        for generel_document in generel_documents:
            try:

                gen_item = PolitikItem()

                vorlage_nr = None
                top_nr = None
                top_name = None
                status = None
                doc_name = ' '.join(generel_document.xpath("text()").getall())
                doc_typ = doc_name
                file_urls = base_url + generel_document.xpath("@href").get()
                id  = file_urls.split('=')[1].split('&')[0]
                pdf_name = date + '_' + kommune + '_' + id + '.pdf'
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


        # More documents
        file_table = response.xpath("//table[@class='table table-striped smc-table smc-table-striped smc-table-responsive smctablesitzung']/tbody/tr")

        for row in file_table:
            
            # only proceed if there are any documents
            if row.xpath("td/div/div/div/div/div/a/@href").get() is not None:
                
                # Get informations about TOP
                vorlage_nr = row.xpath("td[@data-label='Vorlage']/a/text()").get()

                top_nr = row.xpath("td[@class='tofnum']/span/text()").get().split(" ")[1]
                top_name = ' '.join(row.xpath("td[@class='tobetr']/div/text()").getall())

                status = row.xpath("td[@class='tobetr']/div/p/text()").get()
                if status != None:
                    status = status.strip()
                

                files = row.xpath("td/div/div/div/div/div/a[@class='smce-a-u smc-text-block-991 smc-t-r991']")

                for file in files:

                    try:

                        file_item = PolitikItem()
                        
                        doc_name = ' '.join(file.xpath("text()").getall())
                        doc_typ = 'Sitzungsunterlagen und Beschlüsse'
                        file_urls = base_url + file.xpath("@href").get()
                        id  = file_urls.split('=')[1].split('&')[0]
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
