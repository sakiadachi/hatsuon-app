from django.contrib.auth.models import User
from django.views.generic.base import TemplateView

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from hatsuon_app.serializers import TakeSerializer, UserSerializer
from hatsuon_app.models import Collection, Phrase, Take
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


class TakeViewSet(viewsets.ModelViewSet):
    """Take"""

    queryset = Take.objects.all()
    serializer_class = TakeSerializer
    lookup_field = "uuid"
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the takes by the user
        you could also filter with phrase uuid in requesting with query parameter
        Example: localhost:8000/api/v1/takes?phrase_uuid=abcs1234

        Filitering against query parameters
        https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
        """
        queryset = Take.objects.all()
        phrase_uuid = self.request.query_params.get("phrase_uuid")
        if phrase_uuid is not None:
            queryset = queryset.filter(phrase__uuid=phrase_uuid)
        user = self.request.user
        return queryset.filter(created_by=user)
