# Generated by Django 2.0.3 on 2018-07-02 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('discussion', '0002_auto_20180701_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='description',
            field=models.CharField(max_length=16384),
        ),
        migrations.AlterField(
            model_name='question',
            name='description',
            field=models.CharField(max_length=8192),
        ),
    ]
