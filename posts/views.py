from django.shortcuts import render, redirect
from .models import Post, Detail
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from .forms import BlogPostForm, RoleForm, SignupForm, Search
from django.views.generic.edit import UpdateView
from django.views.generic import DetailView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from .utils import filter_post


def my_view(request):
    if request.method == "POST":
        form = BlogPostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("home")
    else:
        form = BlogPostForm()

    return render(request, "home.html", {"form": form})


class Detailview(DetailView):
    template_name = "detail.html"
    model = Post


class Deleteview(DeleteView):
    template_name = "delete.html"
    model = Post
    success_url = reverse_lazy("home")

@login_required(login_url="login")
def post_view(request):
    posts = Post.objects.filter(author=request.user)
    detail=User.objects.filter(username=request.user)
    print(posts)
    if len(posts)==0:
        post_count=0
        head="Nothing to show"
    else:
        post_count=len(posts)
        head="My Posts"
    form = Search()
    return render(request, "view_posts.html", {"posts": posts,"detail":detail,  "search_form": form,"head":head,"profile":True,"post_count":post_count})


def home_view(request):
    posts = Post.objects.all()
    form = Search()
    return render(request, "view_posts.html", {"posts": posts, "search_form": form,"head":"Blog Posts"})

class Update_view(LoginRequiredMixin, UpdateView):
    login_url = "login"
    model = Post
    template_name = "edit.html"
    fields = ["title", "content"]
    success_url = "/"
    heading = "Edit Post"


@login_required(login_url="login")
def add_role(request):
    if request.method == "POST":
        role = RoleForm(request.POST)
        if role.is_valid:
            role.save()
            return redirect("home")
    else:
        role = RoleForm()
    return render(request, "edit.html", {"form": role, "heading": "Add new role"})


def LoginView(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        log = authenticate(request, username=username, password=password)
        if log is not None:
            login(request, log)
            print("Authentication successful, redirecting to home...")
            messages.success(request, "Welcome back "+username+" !")
            return redirect("home")
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, "login.html")


def SignupView(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")
    else:
        form = SignupForm()
    return render(request, "signup.html", {"form": form})


def LogoutView(request):
    logout(request)
    messages.success(request, "logged out!!")
    return redirect("home")


def SpecialView(request):
    if request.method == "POST":
        form = Search(request.POST)
        if form.is_valid():
            name = form.cleaned_data["author"]
            print(name)
            posts = filter_post(name)
            print(posts)
            if posts != []:
                messages.success(request, '''Search results for "'''+ name+'''"''')
                context = {"posts": posts, "search_form": form, "name": name}
                return render(request, "filter.html", context)
    messages.error(request, "Author not found.. Viewing all posts")
    posts = Post.objects.all()
    form = Search()
    context = {"search_form": form, "posts": posts}
    return render(request, "view_posts.html", context)
