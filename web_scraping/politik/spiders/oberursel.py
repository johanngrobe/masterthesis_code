import scrapy
from scrapy.utils.response import open_in_browser
from scrapy_splash import SplashRequest 

class OberurselSpider(scrapy.Spider):
    name = 'oberursel'
    allowed_domains = ['oberursel.ratsinfomanagement.net']
    start_urls = ['https://oberursel.ratsinfomanagement.net/recherche']

    def parse(self, response):

        reqid = response.xpath("//input[@name='reqid']/@value").get()

        csrftoken = response.xpath("//input[@name='csrftoken']").get()

        headers = {
            'Host': 'oberursel.ratsinfomanagement.net',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            # 'Content-Length': '242',
            'Origin': 'https://oberursel.ratsinfomanagement.net',
            'Connection': 'keep-alive',
            'Referer': 'https://oberursel.ratsinfomanagement.net/recherche',
            'Cookie': 'PHPSESSID=b4115012a5871683e80e7bb444d85486e708f4447cc3ad3387abbf12bac2a926',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'TE': 'trailers'
        }
        
        data = {
            'reqid': reqid,
            'csrftoken': csrftoken,
            'terms': '',
            'typ': '0',
            'idgremium': '25',
            'datefrom': '2010-01-01',
            'dateto': '2023-01-31',
            'doktyp_all': 'on',
            'doktyp': ['T','E','B','N']
        }


        yield scrapy.FormRequest(
            url = 'https://oberursel.ratsinfomanagement.net/recherche',
            method = 'POST',
            headers = headers,
            formdata = data, 
            callback = self.parse_after_search,
            dont_filter = True
            )

    def parse_after_search(self, response):
        open_in_browser(response)
        documents = response.xpath("//tbody/tr/td[@class='column-dokument']")
        print('start')
        for doc in documents:
            url = doc.xpath("@href").get()
            print(url)
        print('end')

