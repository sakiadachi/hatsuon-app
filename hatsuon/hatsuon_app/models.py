import uuid
from django.db import models


class Phrase(models.Model):
    """
    Phrase
    """

    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, db_index=True, unique=True
    )
    title = models.CharField(max_length=200)
    description = models.TextField(default="")
    created_date = models.DateTimeField(auto_now_add=True)
    recording = models.FileField(upload_to="", null=True)

    created_by = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-created_date"]


class Collection(models.Model):
    """
    Collection
    """

    title = models.CharField(max_length=200)
    description = models.TextField(default="")
    phrases = models.ForeignKey(Phrase, on_delete=models.CASCADE, null=True)

    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, db_index=True, unique=True
    )
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-created_date"]
