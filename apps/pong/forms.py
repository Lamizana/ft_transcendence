from django import forms
from .models import Player
from django.contrib.auth.forms import PasswordChangeForm

class PlayerForm(forms.ModelForm):
    class Meta:
        model = Player
        fields = ['nickname', 'language']
        labels = {'nickname': 'Nickname', 'language': 'language'}
    
    def clean_nickname(self):
        nickname = self.cleaned_data.get('nickname')
        if len(nickname) < 2:
            raise forms.ValidationError("Your nickname should be more than 2 charaters")
        if Player.objects.filter(nickname=nickname).exists():
            raise forms.ValidationError("Nickname is already use.")
        return nickname

class CustomPasswordChangeForm(PasswordChangeForm):
    class Meta:
        model = Player
        fields = ['old_password', 'new_password1', 'new_password2']   

class ProfilForm(forms.ModelForm):
   class Meta:
       model = Player
       fields = ['nickname', 'picture']


   def clean_nickname(self):
       nickname = self.cleaned_data.get('nickname')
       if nickname and len(nickname) < 2:
           raise forms.ValidationError("Your nickname should be more than 1 characters.")
       if nickname and Player.objects.filter(nickname=nickname).exists():
           raise forms.ValidationError("Nickname is already in use.")
       return nickname
    

class FriendsForm(forms.Form):
    class Meta:
        model = Player
        fields = ['nickname']
        labels = {'nickname': 'Nickname'}

    nickname = forms.CharField(required=True, label='Nickname', max_length=20)
    def clean_nickname(self):
        nickname = self.cleaned_data.get('nickname')
        if Player.objects.filter(nickname=nickname).exists():
            return nickname

class FriendsDeleteForm(forms.Form):
    class Meta:
        model = Player
        fields = ['id_btn']
        labels = {'id_btn': 'id_btn'}
    btn = forms.CharField(label='id_btn')