# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(max_length=6)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ('code',),
            },
        ),
        migrations.CreateModel(
            name='StockDividend',
            fields=[
                ('publicDividendDate', models.DateField(serialize=False, primary_key=True)),
                ('exDividendDate', models.DateField()),
                ('dividendDate', models.DateField()),
                ('description', models.CharField(max_length=255)),
                ('stock', models.ForeignKey(to='api.Stock')),
            ],
            options={
                'ordering': ('publicDividendDate',),
            },
        ),
        migrations.CreateModel(
            name='StockEquity',
            fields=[
                ('date', models.DateField(serialize=False, primary_key=True)),
                ('totalFixedCapital', models.FloatField()),
                ('totalFloatingCapital', models.FloatField()),
                ('totalRestrictCapital', models.FloatField()),
                ('changeReason', models.CharField(max_length=255)),
                ('stock', models.ForeignKey(to='api.Stock')),
            ],
            options={
                'ordering': ('date',),
            },
        ),
    ]
