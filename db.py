import sqlite3
import json

conn = sqlite3.connect('db.sqlite')
cursor = conn.cursor()

sql = '''
SELECT
    id Id,
    title Title,
    author Author,
    state State,
    reading_date ReadingDate,
    genre Genre,
    image Image
FROM books
'''
cursor.execute(sql)
rows = cursor.fetchall()

column_names = [description[0] for description in cursor.description]

books = [dict(zip(column_names, row)) for row in rows]

json_data = json.dumps(books, indent=2)

with open('books.json', 'w') as json_file:
    json_file.write(json_data)
conn.close()
