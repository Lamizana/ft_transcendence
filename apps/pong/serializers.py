from rest_framework import serializers
from .models import Player

class PlayerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'nickname', 'email', 'password')

class UserJoinModelSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.players2 = validated_data.get('players2', instance.players2)
        instance.save()
        return instance
    class Meta:
        model = Player
        fields = ('id', 'players2')

class ScoreModelSerializer(serializers.ModelSerializer):
        
    def update(self, instance, validated_data):
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.wins = validated_data.get('wins', instance.wins)
        instance.loses = validated_data.get('loses', instance.loses)
        instance.duelMyname = validated_data.get('duelMyname', instance.duelMyname)
        instance.duelEnemy = validated_data.get('duelEnemy', instance.duelEnemy)
        instance.duelMe = validated_data.get('duelMe', instance.duelMe)
        instance.duelThem = validated_data.get('duelThem', instance.duelThem)
        instance.date = validated_data.get('date', instance.date)

        instance.save()
        return instance

    class Meta:
        model = Player
        fields = ('id', 'nickname', 'wins', 'loses', 'duelMyname', 'duelEnemy', 'duelMe', 'duelThem', 'date')

class TournamentSerializer(serializers.ModelSerializer):
        
    def update(self, instance, validated_data):
        instance.tourPos = validated_data.get('tourPos', instance.tourPos)
        instance.tourAll = validated_data.get('tourAll', instance.tourAll)
        instance.save()
        return instance

    class Meta:
        model = Player
        fields = ('id', 'tourPos', 'tourAll')
    

class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'nickname', 'picture'] 

    def update(self, instance, validated_data):
        instance.nickname = validated_data.get('nickname', instance.nickname)
        if 'picture' in validated_data:
            instance.picture = validated_data.get('picture', instance.picture)
        instance.save()
        return instance



class LanguageSerializer(serializers.ModelSerializer):
        
    def update(self, instance, validated_data):
        instance.language = validated_data.get('language', instance.language)
        instance.save()
        return instance

    class Meta:
        model = Player
        fields = ('language', )


class StatusSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

    class Meta:
        model = Player
        fields = ('id', 'status')
