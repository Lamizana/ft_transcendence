from django.shortcuts               import render, redirect
from django.contrib.auth            import login, logout
from django.contrib.auth.forms      import UserCreationForm
import json
from django.contrib.auth            import authenticate
from .forms                         import loginForm
from pong.models                    import Player
from django.core.exceptions         import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required
from django.urls                    import reverse

# Create your views here.

def register(request):
    """Inscrire un nouvel utilisateur."""
    if request.user.is_authenticated:
        return redirect("pong:index") 

    if request.method != 'POST':
        # Afficher un formulaire d'inscription vide:
        form = UserCreationForm()
    else:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        # Traiter le formulaire rempli:
        form = UserCreationForm(body)
        if form.is_valid():
            new_user = form.save()
            # Ouvrir session de l'utilisateur et diriger vers la page profil:
            login(request, new_user)
            return redirect('pong:new_profil')
        
    # Afficher un formuliare vierge ou invalide:
    context = {'form': form}
    return render(request, 'registration/register.html', context)

def loginHomeMade(request):
    if request.user.is_authenticated:
        return redirect(reverse("pong:index")) 
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        form = loginForm(body)
        user = authenticate(request, username=body['username'], password=body['password'])
        if user:
            login(request, user)
            return redirect('pong:new_profil')
    else:
        form = loginForm()
        return render(request, 'registration/login.html', {'form': form})

    print("juste avant render")
    return render(request, 'registration/login.html', {'form': form})


def _get_profil(request):
    """Verife que le profil du User existe."""
    print("vue _get_profil")

    try:
        return Player.objects.get(owner=request.user)
    except ObjectDoesNotExist:
        return None

@login_required
def logout_view(request):
    print("vue logout_view")
    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')

    player.status = 0
    player.save()
    logout(request)
    return redirect('pong:index')
