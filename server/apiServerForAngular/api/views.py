import requests
import csv
import json
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from .models import *
from rest_framework import viewsets, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow groups to be viewed or edited
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class StockEquityViewSet(viewsets.ModelViewSet):
    queryset = StockEquity.objects.all()
    serializer_class = StockEquitySerializer


class StockDividendViewSet(viewsets.ModelViewSet):
    queryset = StockDividend.objects.all()
    serializer_class = StockDividendSerializer


class StockHistoryDataView(APIView):
    # authentication_classes = (authentication.BaseAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, stockcode, format=None):
        suffix = ''
        if stockcode.startswith('0'):
            suffix = 'sz'
        else:
            suffix = 'ss'

        resp = requests.get('http://table.finance.yahoo.com/table.csv?s=%s.%s' % (stockcode, suffix))
        if resp.status_code == 200:
            data = resp.text.split('\n')[:-1]
            keys = data[0].split(',')
            out = [{
                key: val for key, val in zip(keys, prop.split(','))
            } for prop in data[1:]]
        else:
            out = []

        return Response(json.dumps(out))
