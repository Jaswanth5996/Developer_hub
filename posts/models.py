from django.db import models
from django.contrib.auth.models import User

genres = [
    ("action", "Action"),
    ("drama", "Drama"),
    ("comedy", "Comedy"),
    ("history", "History"),
    ("news", "News"),
    ("thriller", "Thriller"),
    ("horror", "Horror"),
    ("fantasy", "Fantasy")
]


class Post(models.Model):
    title = models.CharField(
        max_length=50,
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(default="New")
    genre = models.CharField(choices=genres, null=True,max_length=10,blank=True)
    image_url=models.URLField(null=True)
    def __str__(self):
        return self.title
