"""tileslide URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
"""
from django.conf.urls import patterns, include, url
from django.contrib import admin
from puzzles.views import home_page

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    url(r'^$', home_page, name='home'),
]
