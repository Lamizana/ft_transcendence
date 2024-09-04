from django.shortcuts               import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions         import ObjectDoesNotExist
from .models                        import Player
from django.contrib.auth.forms      import UserCreationForm,PasswordChangeForm
from .forms                         import PlayerForm, ProfilForm, FriendsForm, FriendsDeleteForm, CustomPasswordChangeForm
from django.http                    import JsonResponse
from .serializers                   import ScoreModelSerializer, TournamentSerializer, ProfilSerializer, LanguageSerializer, StatusSerializer
from rest_framework                 import viewsets, status
from rest_framework.response        import Response
from rest_framework.decorators      import action
from django.contrib.auth            import update_session_auth_hash
from django.views.decorators.http import require_POST
import json
 
def _get_profil(request):
    """Verife que le profil du User existe."""
    print("vue _get_profil")

    try:
        return Player.objects.get(owner=request.user)
    except ObjectDoesNotExist:
        return None
    
@login_required
def profil(request):
    """Affiche la page de profil."""

    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')

    if request.method == 'PUT':
        print("dans le put")

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        profil_form = ProfilForm(body, instance=player)
        password_form = CustomPasswordChangeForm(request.user, body)

        if profil_form.is_valid():
            profil_form.save()
            return redirect('profil')

    else:
        profil_form = ProfilForm(instance=player)
        password_form = CustomPasswordChangeForm(request.user)

    context = {
        'profil_form': profil_form,
        'password_form': password_form,
        'player': player
    }
    return render(request, 'pong/profil.html', context)

@login_required
def change_password(request):
    print("vue change_password")

    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)


    profil_form = ProfilForm(instance=player)
    password_form = CustomPasswordChangeForm(request.user)
    form = CustomPasswordChangeForm(user=request.user, data=body)
    if request.method == 'POST':
    # Traiter le formulaire rempli et renvoie a l'accueil:
        if form.is_valid():
            request.user.password = body['new_password1']
            user = form.save()
            update_session_auth_hash(request, user)  # pour rester connecté
            return redirect("pong:index")
        else:
            errors = form.errors.as_json()

    context = {
        'profil_form': profil_form,
        'password_form': password_form,
        'player': player
    }
    return render(request, 'pong/profil.html', context)
    


class ProfilViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = ProfilSerializer

    def update(self, request, *args, **kwargs):
        player = self.get_object()
        serializer = self.get_serializer(player, data=request.data, partial=True)
        if serializer.is_valid():
            if 'picture' in request.FILES:
                player.picture = request.FILES['picture']
            if 'nickname' in serializer.validated_data:
                player.nickname = serializer.validated_data['nickname']
            player.save()
            return Response({'success': True, 'message': 'Success'}, status=status.HTTP_200_OK)
        return Response({'success': False, 'message': serializer.errors})



# Create your views here.
@login_required
def index(request):
    """La page d'accueil pour PONG."""
    print("INDEX VUE")

    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')

    player.status = 1
    player.save()
    
    return render(request, 'pong/index.html', {'player':player})


def base(request):
    """La page d'accueil pour PONG."""
    
    print("base VUE")
    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')
    
    return render(request, 'pong/base.html', {'player':player})


@login_required
def new_profil(request):
    """Ajoute un nouvel utilisateur et son profil."""

    print("VUE new_profil")
    player = _get_profil(request)
    if player != None:
        return redirect('pong:index')

    if request.method == 'POST':
        # Traiter le formulaire rempli et renvoie a l'accueil:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            form = PlayerForm(body)
            if form.is_valid():
                profil = form.save(commit=False)
                profil.owner = request.user
                profil.nickname = body['nickname']
                profil.language = body['language']
                profil.status = 1
                profil.save()
                return render(request, 'pong/index.html', { 'player':player})
            else:
                print(form.errors)

    else:
        # Afficher un formulaire d'inscription vide:
        form = PlayerForm()
    # Afficher un formuliare vierge ou invalide:
    context = {'form': form}
    return render(request, 'pong/new_profil.html', context)



@login_required
def del_user(request):
    """Supprime un utilisateur et supprime ses donn€es."""
    print("VUE del_user")
    
    user = request.user
    user.delete()
    return redirect("pong:index")


@login_required
def pong(request):
    """Page du jeux Pong."""
    print("VUE PONG")

    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')
    
    players = Player.objects.all()
    player = Player.objects.get(owner=request.user)
    return render(request, "pong/pong.html",  { 'players':players, 'player':player})


@login_required
def save_button_info(request):
    """Change la langue et sauvegarde."""
    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')
 
    if request.method == 'POST':
        if request.POST['language']:
            player.language = request.POST['language']
            player.save()
            return JsonResponse({'success': True, 'message': 'Language changed'})
    else:
        return JsonResponse({'status': 'invalid request'}, status=400)


class ScoreGame(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = ScoreModelSerializer

    def put(self,request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nickname = serializer.data.get('nickname')
            wins = serializer.data.get('wins')
            loses = serializer.data.get('loses')
            duelMyname = serializer.data.get('duelMyname')
            duelEnemy = serializer.data.get('duelEnemy')
            duelMe = serializer.data.get('duelMe')
            duelThem = serializer.data.get('duelThem')
            date = serializer.data.get('date')

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = TournamentSerializer
            
    def put(self,request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            tourPos = serializer.data.get('tourPos')
            tourAll = serializer.data.get('tourAll')


class Changelanguage(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = LanguageSerializer
    def put(self,request, format=None):
        print("Changelanguage")       
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            language = serializer.data.get('language')
            
class ChangeStatus(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = StatusSerializer
    def put(self,request, format=None):
        print("CHANGE STATUS")       
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            status = serializer.data.get('status')
            
@login_required
def change_status(request):
    print("vue change_status")

@login_required
def friends(request):
    print("VUE friends")

    player = _get_profil(request)
    if player is None:
        return redirect('pong:new_profil') 

    all_players = Player.objects.all()
    if player.FriendsId is not None:
        friends_ids = [int(id) for id in player.FriendsId if isinstance(id, int)]
    else:
        friends_ids = []
    friends = Player.objects.filter(id__in=friends_ids)

    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        form = FriendsForm(body)
        print(request.method)
        

        if form.is_valid():
            nickname =  body['nickname']
            try:
                Player.objects.get(nickname=nickname)
            except:
                return JsonResponse({'success': False, 'message': 'Nickname doesn\'t exists'})

            if player.id == Player.objects.get(nickname=nickname).id:
                return JsonResponse({'success': False, 'message': 'Cannot add yourself.'})
            if player.FriendsId is None:
                player.FriendsId = [Player.objects.get(nickname=nickname).id]
                player.save()
                return JsonResponse({'success': True, 'message': 'Friend added'})
            elif not int(Player.objects.get(nickname=nickname).id) in player.FriendsId:
                player.FriendsId.append(Player.objects.get(nickname=nickname).id)
                player.save()
                return JsonResponse({'success': True, 'message': 'Friend added 2 '})

        if body['id_btn']:
            i = body['id_btn']
            if int(i) in player.FriendsId:
                player.FriendsId.remove(int(i))
            player.save()
            return JsonResponse({'success': True, 'message': 'deleted friend.'})
        else:
                return JsonResponse({'success': False, 'message': 'no id found.'})
    else:
        form = FriendsForm()
    
    return render(request, "pong/friends.html",{'form':form,'player': player,'allPlayers': all_players,'everyFriend': friends})



