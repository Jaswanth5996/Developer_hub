from django.urls import path
from .views import (
    PostListCreateAPIView,
    PostDetailAPIView,
    MyPostsAPIView,
    UserDetailAPIView,
    SignupView,
    LoginView,
)

urlpatterns = [
    path('api/posts/', PostListCreateAPIView.as_view(), name='api-post-list-create'),
    path('api/posts/<int:pk>/', PostDetailAPIView.as_view(), name='api-post-detail'),
    path('api/my-posts/', MyPostsAPIView.as_view(), name='api-my-posts'),
    path('api/users/<int:pk>/', UserDetailAPIView.as_view(), name='api-user-detail'),
    path('api/signup/', SignupView.as_view(), name='api-signup'),
    path('api/login/', LoginView.as_view(), name='api-login'),
]
