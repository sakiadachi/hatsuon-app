from django.contrib.auth.models import User
from rest_framework import serializers
from hatsuon_app.models import Collection


class CollectionSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Collection
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    collections = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Collection.objects.all()
    )

    class Meta:
        model = User
        fields = "__all__"
