from django.contrib.auth.models import User
from rest_framework import serializers
from hatsuon_app.models import Collection


class CollectionSerializer(serializers.HyperlinkedModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Collection
        fields = ["id", "title", "description", "created_by"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    collections = serializers.HyperlinkedRelatedField(
        many=True, view_name="collection-detail", read_only=True
    )

    class Meta:
        model = User
        fields = ["id", "url", "username", "email", "collections"]
