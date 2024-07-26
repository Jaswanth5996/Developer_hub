from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Detail(models.Model):
    role = models.TextField(max_length=10)

    def __str__(self):
        return self.role

genres=[("action","Action"),("drama","Drama"),("comedy","Comedy"),("history","History"),
        ("news","News"),("thriller","Thriller"),("horror","Horror")]
class Post(models.Model):
    title = models.CharField(
        max_length=20,
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(default="New")
    role = models.ForeignKey(Detail, on_delete=models.CASCADE)
    genre=models.CharField(choices=genres,default="")

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    title="image"
    profile_photo=models.FileField(upload_to="static/")
    def __str__(self):
        return self.title
