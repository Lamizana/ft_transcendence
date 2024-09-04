from django.db                      import models
from django.core.validators         import MinLengthValidator
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models     import User


class Player(models.Model):
    """Informations concernant l'utilisateurs"""

    # Fixe automatiquement l'heure courante lors de la creation d'un nv User:
    date_added = models.DateTimeField(auto_now_add=True)

    nickname = models.CharField(
        max_length=20, verbose_name="nickname", 
        validators=[MinLengthValidator(2, message="the nickname should have at least 2 characters.")],
        unique=True,

    )
    picture = models.ImageField(upload_to="", default="/default.png", blank=True,height_field=None, width_field=None, max_length=100,)
    wins = models.IntegerField(blank=True, default='0')
    loses = models.IntegerField(blank=True, default='0')

    tourPos = ArrayField(models.IntegerField(null=True, blank=True), null=True, blank=True)
    tourAll = ArrayField(models.IntegerField(null=True, blank=True), null=True, blank=True)

    duelMyname = ArrayField(models.CharField(null=True, blank=True),null=True, blank=True)
    duelEnemy = ArrayField(models.CharField(null=True, blank=True),null=True, blank=True)
    duelMe = ArrayField(models.IntegerField(null=True, blank=True),null=True, blank=True)
    duelThem = ArrayField(models.IntegerField(null=True, blank=True),null=True, blank=True)
    date = ArrayField(models.CharField(null=True, blank=True),null=True, blank=True)

    FriendsId = ArrayField(models.IntegerField(null=True, blank=True),null=True, blank=True)

    # status 0 = disconnect, 1 = connected
    status = models.IntegerField(blank=True, default='1')

    LANGUAGE_CHOICES = (
        ('EN', 'english'),
        ('ES', 'spanish'),
        ('FR', 'french'),
    )
 
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)

    # Supprime tous les éléments liées a l'utilisateur:
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'Profil: {self.nickname} - User: {self.owner}'
    def clean(self):
        super().clean()
