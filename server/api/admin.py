from django.contrib import admin
from .models import *
from django.contrib.admin import ModelAdmin, TabularInline
from nested_admin.nested import NestedModelAdmin, NestedTabularInline


class BaseAdmin(ModelAdmin):
    readonly_fields = ('id',)


class UniversityAdmin(NestedModelAdmin):
    class CampusInline(NestedTabularInline):
        class MajorInline(NestedTabularInline):
            model = Major
            extra = 0

        extra = 0
        model = Campus
        inlines = [MajorInline]

    inlines = [CampusInline]


# Register your models here.

admin.site.register(University, UniversityAdmin)
admin.site.register(User)
admin.site.register(RegistrationForm)
admin.site.register(CommunityDepartment)
admin.site.register(CommunityCategory)
admin.site.register(Community)
