from django import forms
from .models import Post, Detail
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class BlogPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "author", "content", "genre"]


class RoleForm(forms.ModelForm):
    class Meta:
        model = Detail
        fields = ["role"]


class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "email","first_name","last_name","password1", "password2"]


class Search(forms.Form):
    author = forms.CharField(
        widget=forms.TextInput(attrs={"class": "small-input", "placeholder": "search for article(s).."}),
        label=""
    )
