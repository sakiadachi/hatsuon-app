# Generated by Django 5.0.4 on 2024-05-09 01:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hatsuon_app', '0002_alter_collection_created_by_phrase'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='phrases',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='hatsuon_app.phrase'),
        ),
        migrations.AlterField(
            model_name='phrase',
            name='recording',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
