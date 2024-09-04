"""Definir des motifs d'URL pour utilisateurs"""

from django.urls    import path, include
from .              import views

app_name = 'utilisateurs'

urlpatterns = [    
    # Page d'inscription:
    path('register/', views.register, name='register'),
    path('login/', views.loginHomeMade, name='login'),
    path('logout/', views.logout_view, name='logout_view'),
]

