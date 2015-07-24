from django.db import models

class Stock(models.Model):
    code = models.CharField(null=False, max_length=6)
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('code',)

    def __unicode__(self):
        return ",".join([self.code, self.name])


class StockEquity(models.Model):
    date = models.DateField(null=False, primary_key=True)
    totalFixedCapital = models.FloatField()
    totalFloatingCapital = models.FloatField()
    totalRestrictCapital = models.FloatField()
    changeReason = models.CharField(max_length=255)
    stock = models.ForeignKey(Stock)

    class Meta:
        ordering = ('date',)

    def __unicode__(self):
        return ",".join([self.stock.code, self.date.isoformat(), str(self.totalFixedCapital)])

class StockDividend(models.Model):
    publicDividendDate = models.DateField(null=False, primary_key=True)
    exDividendDate = models.DateField()
    dividendDate = models.DateField()
    description = models.CharField(max_length=255)
    stock = models.ForeignKey(Stock)

    class Meta:
        ordering = ('publicDividendDate',)

    def __str__(self):
        return ",".join([self.stock.code, self.description])
