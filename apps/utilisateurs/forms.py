from django import forms
from pong.models import Player

class loginForm(forms.Form):
    username = forms.CharField(required=False, max_length=20, min_length=2, label='Username')
    password = forms.CharField(widget=forms.PasswordInput(attrs={'id': 'id_password'}), required=False, label='Password', max_length=100)
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        return username