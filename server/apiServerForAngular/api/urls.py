from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'group', views.GroupViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^stockyearrange/(?P<stockcode>[0-9]{6})$', views.StockYearRangeView.as_view()),
]
