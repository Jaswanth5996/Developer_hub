from django.db import connection


def filter_post(val):
    val = val.upper()
    query = "select p.id,u.username,p.title,p.content from posts_post p join auth_user u on p.author_id=u.id where upper(u.username) like %s or upper(p.title) like %s or upper(p.content) like %s "
    param = [val + "%", "%" + val + "%", "%" + val + "%"]
    with connection.cursor() as cursor:
        cursor.execute(query, param)
        columns = [col[0] for col in cursor.description]  # Retrieve column names
        res = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return res
