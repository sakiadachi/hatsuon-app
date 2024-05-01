from django.urls import include, path
from rest_framework.routers import DefaultRouter
from hatsuon_app import views

router = DefaultRouter()
router.register(r'collections', views.CollectionViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
