from django.contrib.auth.models import User
from django.views.generic.base import TemplateView

from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated

from hatsuon_app.serializers import UserSerializer
from hatsuon_app.models import Collection, Phrase
from hatsuon_app.serializers import CollectionSerializer, PhraseSerializer


class SpaView(TemplateView):
    """View for Frontend"""

    template_name = "frontend/base.html"


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class CollectionPhraseListCreateAPIView(generics.ListCreateAPIView):
    """Collection.phrases"""

    serializer_class = PhraseSerializer

    def get_queryset(self):
        return Phrase.objects.filter(collection__pk=self.kwargs["collection_pk"])

    def perform_create(self, serializer):
        super().perform_create(serializer)
        collection = Collection.objects.get(pk=self.kwargs["collection_pk"])
        collection.phrases.add(serializer.instance)


class CollectionPhraseRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = PhraseSerializer

    def get_queryset(self):
        return Phrase.objects.filter(collection__pk=self.kwargs["collection_pk"])


class CollectionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = "uuid"
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the clipboards
        for the currently authenticated user.
        """
        user = self.request.user
        return Collection.objects.filter(created_by=user)


class PhraseViewSet(viewsets.ModelViewSet):
    """Phease"""

    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer
    lookup_field = "uuid"
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the clipboards
        for the currently authenticated user.
        """
        user = self.request.user
        return Phrase.objects.filter(created_by=user)
