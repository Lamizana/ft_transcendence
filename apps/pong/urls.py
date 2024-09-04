
from django.urls    import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'pong'

router = DefaultRouter()
router.register(r'score', views.ScoreGame, basename='score')
router.register(r'tournament', views.TournamentViewSet, basename='tournament')
router.register(r'profil', views.ProfilViewSet, basename='profil')
router.register(r'language', views.Changelanguage, basename='language')
router.register(r'status', views.ChangeStatus, basename='status')

urlpatterns = [
    # Page d'accueil:
    path('', views.index, name='index'),

    # Page d'affichage des détails d'un seul User.
    path('profil/', views.profil, name='profil'),

    # Page d'ajout d'un nouveau profil.
    path('new_profil/', views.new_profil, name='new_profil'),

    # Page d'affichage du jeux pong.
    path('pong/', views.pong, name='pong'),

    # Page de suppression User et ses données.
    path('del_user/', views.del_user, name='del_user'),

    path('save_button_info/', views.save_button_info, name='save_button_info'),
    
    path('friends/', views.friends, name='friends'),

    path('game/', include(router.urls)),
    
    path('change_password/', views.change_password, name='change_password'),

    path('change_status/', views.change_status, name='change_status'),

    path('base/', views.base, name='base'),
]


