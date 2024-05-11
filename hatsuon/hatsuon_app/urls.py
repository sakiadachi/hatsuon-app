from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from hatsuon_app import views


router = DefaultRouter()
router.register(r"collections", views.CollectionViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"phrases", views.PhraseViewSet)

collections_router = routers.NestedDefaultRouter(router, "collections")
collections_router.register("phrases", views.PhraseViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("", include(collections_router.urls)),
]
frontend_urlpatterns = [
    path(r"", views.SpaView.as_view(), name="spa"),
    path(r"login", views.SpaView.as_view(), name="spa"),
    path(r"collection", views.SpaView.as_view(), name="spa"),
]
