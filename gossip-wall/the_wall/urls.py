from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('wall', views.wall),
    path('login', views.login),
    path('register', views.register),
    path('logout', views.logout),
    path('comment', views.comment),
    path('message', views.message),
    path('delete/<int:id>/<int:typeid>/<str:label>', views.delete),
]
