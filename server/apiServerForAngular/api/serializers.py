from django.contrib.auth.models import User, Group
from .models import *
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock


class StockEquitySerializer(serializers.ModelSerializer):
    class Meta:
        model = StockEquity

class StockDividendSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockDividend
