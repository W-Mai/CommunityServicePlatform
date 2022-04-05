# Generated by Django 3.2 on 2022-04-05 02:58

from django.db import migrations, models
import django.db.models.deletion
import smart_selects.db_fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_userinformation_college'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinformation',
            name='campus',
            field=smart_selects.db_fields.ChainedForeignKey(chained_field='university', chained_model_field='university', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userinformation', to='api.university', verbose_name='Campus'),
        ),
        migrations.AddField(
            model_name='userinformation',
            name='university',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userinformation_set', to='api.university'),
        ),
        migrations.AlterField(
            model_name='campus',
            name='university',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='university_set', to='api.university', verbose_name='University'),
        ),
        migrations.AlterField(
            model_name='college',
            name='campus',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='campus_set', to='api.campus', verbose_name='Campus'),
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='college',
            field=smart_selects.db_fields.ChainedForeignKey(chained_field='campus', chained_model_field='campus', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userinformation', to='api.campus', verbose_name='College'),
        ),
    ]
