# Generated by Django 3.2 on 2021-11-16 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211116_2255'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrationform',
            name='selfAssessment',
            field=models.TextField(default='ok', verbose_name='Self introduce'),
            preserve_default=False,
        ),
    ]
