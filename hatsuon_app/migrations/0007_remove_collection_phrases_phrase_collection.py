# Generated by Django 5.0.4 on 2024-05-18 02:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hatsuon_app', '0006_remove_phrase_collection_collection_phrases'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='collection',
            name='phrases',
        ),
        migrations.AddField(
            model_name='phrase',
            name='collection',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='phrases', to='hatsuon_app.collection'),
            preserve_default=False,
        ),
    ]
