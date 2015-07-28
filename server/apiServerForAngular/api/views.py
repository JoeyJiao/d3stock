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

from .utils import bisector_left


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
            suffix = 'SZ'
        else:
            suffix = 'SH'

        stockEquities = StockEquity.objects.all()

        headers = {
            'User-Agent': 'Mozilla/5.0'
        }
        resp = requests.get(
            'http://xueqiu.com/S/%s%s/historical.csv' % (suffix, stockcode),
            headers=headers
        )
        if resp.status_code == 200:
            data = resp.text.split('\n')[:-1]
            keys = data[0].split(',')
            keys = [x.replace('"', '') for x in keys]
            out = [{
                key: val.replace('"', '') for key, val in zip(keys, prop.split(','))
            } for prop in data[1:]]

            array = [x.date.isoformat() for x in stockEquities]
            for each in out:
                index = bisector_left(array, each['date'])
                each['equity'] = stockEquities[index].totalFixedCapital
        else:
            out = []

        return Response(json.dumps(out))
