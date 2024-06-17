from django.db import models


# Create your models here.
class Detail(models.Model):
    role = models.TextField(max_length=10)

    def __str__(self):
        return self.role


class Post(models.Model):
    title = models.CharField(
        max_length=20,
    )
    author = models.CharField(max_length=20)
    content = models.TextField(default="New")
    role = models.ForeignKey(Detail, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
