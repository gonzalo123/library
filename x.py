import xml.etree.ElementTree as ET
from datetime import datetime
import sqlite3
from pathlib import Path
import requests

BASE_DIR = Path(__file__).resolve().parent

def descargar_imagen(url):
    # Obtener el nombre del archivo de la URL
    nombre_archivo = url.split("/")[-1]

    # Crear la ruta completa del archivo
    ruta_archivo = BASE_DIR / 'cover' / nombre_archivo

    # Descargar la imagen
    respuesta = requests.get(url)

    # Guardar la imagen en la carpeta destino
    with open(ruta_archivo, 'wb+') as archivo:
        archivo.write(respuesta.content)

    return nombre_archivo

# Cargar y analizar el archivo RSS
tree = ET.parse('x.rss')
root = tree.getroot()

# Espacio de nombres
namespace = {'atom': 'http://www.w3.org/2005/Atom'}

# Extraer los elementos de los libros
items = root.findall('.//item')

# Crear una lista para almacenar los datos
books = []

# Recorrer los elementos y extraer el título, el autor y la URL de la imagen
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

# Imprimir la tabla

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
    cursor.execute('''
        INSERT INTO books (Title, Author, State, ReadingDate, Image)
        VALUES (:title, :author, :state, :reading_date, :image)
    ''', book_data)
    print(book_data)
conn.commit()
conn.close()
