from django.contrib.auth.models import User
from rest_framework import serializers
from hatsuon_app.models import Collection, Phrase


class PhraseSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Phrase
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")
    phrases = PhraseSerializer(many=True,read_only=True)
    class Meta:
        model = Collection
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    collections = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Collection.objects.all()
    )

    class Meta:
        model = User
        fields = ["username", "email", "url", "is_stuff"]
