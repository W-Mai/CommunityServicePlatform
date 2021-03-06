# Generated by Django 3.2 on 2021-11-16 14:34

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Campus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Campus Name')),
                ('address', models.CharField(max_length=100, verbose_name='Address of this campus')),
                ('description', models.TextField(verbose_name="What's up")),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Community name')),
                ('rank', models.FloatField(default=0.0)),
                ('information', models.TextField(verbose_name="What's up")),
                ('images', models.JSONField()),
                ('thumbnail', models.TextField()),
                ('qqGroup', models.CharField(max_length=20)),
                ('openUpDateStart', models.DateTimeField()),
                ('openUpDateEnd', models.DateTimeField()),
                ('message', models.TextField(verbose_name='Message this community will notice')),
                ('campus', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.campus')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CommunityCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Category name')),
                ('information', models.TextField(verbose_name="What's up")),
                ('logo', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CommunityDepartment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Department name')),
                ('information', models.TextField(verbose_name="What's up")),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Major Name')),
                ('description', models.TextField(verbose_name="What's Up")),
                ('campus', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.campus')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='University name')),
                ('description', models.TextField(verbose_name="What's up")),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tel', models.CharField(max_length=20, verbose_name='Telephone Number')),
                ('name', models.CharField(max_length=16, verbose_name="What's your name")),
                ('schoolNumber', models.CharField(max_length=30, verbose_name='School Number or some IDs')),
                ('QQ', models.CharField(max_length=20, verbose_name='QQ Number (A social media platform)')),
                ('college', models.CharField(max_length=50, verbose_name="What's your college")),
                ('gender', api.models.GenderField(choices=[('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHERS', 'Others')], default='OTHERS', max_length=20)),
                ('politicalLandscape', models.CharField(max_length=20)),
                ('national', models.CharField(max_length=50)),
                ('birthday', models.DateField()),
                ('nativePlace', models.CharField(max_length=50)),
                ('headPortrait', models.TextField()),
                ('personalProfile', models.TextField(verbose_name='Introduce yourself')),
                ('campus', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.campus')),
                ('major', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.major')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('openid', models.CharField(max_length=50, verbose_name='wx openid')),
                ('username', models.CharField(max_length=50)),
                ('password', models.TextField()),
                ('isVerified', models.BooleanField()),
                ('group', api.models.UserGroupField(choices=[('STUDENT', 'Student'), ('TEACHER', 'Teacher'), ('ADMIN', 'Admin')], default='STUDENT', max_length=20)),
                ('information', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.userinformation')),
                ('joinedCommunities', models.ManyToManyField(to='api.Community')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RegistrationForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('whetherToAdjust', models.BooleanField()),
                ('message', models.TextField()),
                ('community', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.community')),
                ('department1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='registrationFormDepartment1', to='api.communitydepartment')),
                ('department2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='registrationFormDepartment2', to='api.communitydepartment')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.user')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='community',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.communitycategory'),
        ),
        migrations.AddField(
            model_name='community',
            name='department',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.communitydepartment'),
        ),
        migrations.AddField(
            model_name='campus',
            name='university',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.university'),
        ),
    ]
