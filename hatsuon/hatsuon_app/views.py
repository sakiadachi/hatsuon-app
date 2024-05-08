from django.contrib.auth.models import User

from rest_framework import permissions, viewsets

from hatsuon_app.serializers import UserSerializer
from hatsuon_app.models import Collection
from hatsuon_app.serializers import CollectionSerializer
from hatsuon_app.permissions import IsOwnerOrReadOnly


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_field = "uuid"

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the clipboards
        for the currently authenticated user.
        """
        user = self.request.user
        return Collection.objects.filter(created_by=user)
