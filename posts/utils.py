from django.db import connection


def filter_post(val):
    val = val.upper()
    query = "select * from posts_post where upper(author) like %s or upper(title) like %s or upper(content) like %s "
    param = ["%" + val + "%", "%" + val + "%", "%" + val + "%"]
    with connection.cursor() as cursor:
        cursor.execute(query, param)
        columns = [col[0] for col in cursor.description]  # Retrieve column names
        res = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return res
