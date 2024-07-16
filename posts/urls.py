from django.urls import path
from .views import (
    my_view,
    post_view,
    Update_view,
    add_role,
    LoginView,
    SignupView,
    LogoutView,
    SpecialView,
    Detailview,
    Deleteview,
    home_view,

)

urlpatterns = [
    path("user_post", post_view, name="user_post"),
    path("",home_view,name="home"),
    path("posts", my_view, name="posts"),
    path("edit/<int:pk>", Update_view.as_view(), name="edit"),
    path("role", add_role, name="role"),
    path("login", LoginView, name="login"),
    path("signup", SignupView, name="signup"),
    path("logout", LogoutView, name="logout"),
    path("filter", SpecialView, name="filter"),
    path("detail/<int:pk>", Detailview.as_view(), name="detail"),
    path("detail/<int:pk>/delete", Deleteview.as_view(), name="delete"),
]
