# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class PolitikItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    kommune = scrapy.Field()
    kommunale_ebene = scrapy.Field()
    date = scrapy.Field()
    id = scrapy.Field()
    doc_typ = scrapy.Field()
    sitzung_nr = scrapy.Field()
    gremium = scrapy.Field()
    vorlage_nr = scrapy.Field()
    top_nr = scrapy.Field()
    top_name = scrapy.Field()
    status = scrapy.Field()
    doc_name = scrapy.Field()
    pdf_name = scrapy.Field()
    file_urls = scrapy.Field()
    files = scrapy.Field()
    rel_path_to_file = scrapy.Field()
    content = scrapy.Field()
