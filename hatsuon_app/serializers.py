from django.contrib.auth.models import User
from rest_framework import serializers
from hatsuon_app.models import Collection, Phrase, Take


class TakeSerializer(serializers.ModelSerializer):
    """Take"""
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Take
        fields = "__all__"

class PhraseSerializer(serializers.ModelSerializer):
    """Phrase"""
    created_by = serializers.ReadOnlyField(source="created_by.username")
    
    class Meta:
        model = Phrase
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    """Collection"""
    created_by = serializers.ReadOnlyField(source="created_by.username")
    phrases = PhraseSerializer(many=True,read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    """User"""
    collections = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Collection.objects.all()
    )

    class Meta:
        model = User
        fields = ["username", "email", "url", "is_stuff"]
