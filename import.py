import xml.etree.ElementTree as ET
from datetime import datetime
import sqlite3
from pathlib import Path
import requests
import logging

BASE_DIR = Path(__file__).resolve().parent

logging.basicConfig(
    format='%(asctime)s [%(levelname)s] %(message)s',
    level='INFO',
    datefmt='%d/%m/%Y %X')

logger = logging.getLogger(__name__)


def descargar_imagen(url):
    nombre_archivo = url.split("/")[-1]
    ruta_archivo = BASE_DIR / 'cover' / nombre_archivo

    respuesta = requests.get(url)
    with open(ruta_archivo, 'wb+') as archivo:
        archivo.write(respuesta.content)

    return nombre_archivo


tree = ET.parse('import.rss')
root = tree.getroot()

namespace = {'atom': 'http://www.w3.org/2005/Atom'}

items = root.findall('.//item')
books = []

for item in items:
    title = item.find('title').text
    author = item.find('author_name').text
    image_url = item.find('book_large_image_url').text
    user_read_at = item.find('user_read_at').text
    if user_read_at:
        date_obj = datetime.strptime(user_read_at, '%a, %d %b %Y %H:%M:%S %z')
        formatted_date = date_obj.strftime('%Y-%m-%d')
    else:
        formatted_date = None
    books.append((title, author, image_url, formatted_date))

conn = sqlite3.connect('db.sqlite')
cursor = conn.cursor()

for book in books:
    nombre_archivo = descargar_imagen(book[2])
    book_data = {
        'title': book[0],
        'author': book[1],
        'state': 'Leído',
        'reading_date': book[3],
        'image': nombre_archivo,
    }
    cursor.execute('SELECT COUNT(*) FROM books WHERE Title = ?', (book_data['title'],))
    book_id = cursor.fetchone()[0]
    if book_id == 0:
        cursor.execute('''
            INSERT INTO books (Title, Author, State, ReadingDate, Image)
            VALUES (:title, :author, :state, :reading_date, :image)
        ''', book_data)

        logger.info(f'Libro "{book_data["title"]}" insertado correctamente')
    else:
        cursor.execute('''
                UPDATE books
                SET Author = :author, State = :state, ReadingDate = :reading_date, Image = :image
                WHERE Id = :id
            ''', {**book_data, 'id': book_id})
        logger.info(f'Libro "{book_data["title"]}" actualizado correctamente')


conn.commit()
conn.close()
