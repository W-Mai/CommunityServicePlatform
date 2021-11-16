from django.contrib import admin
from .models import *
from django.contrib.admin import ModelAdmin, TabularInline, StackedInline
from nested_admin.nested import NestedModelAdmin, NestedTabularInline, NestedStackedInline


class BaseAdmin(ModelAdmin):
    readonly_fields = ('id',)


@admin.register(University)
class UniversityAdmin(NestedModelAdmin):
    class CampusInline(NestedTabularInline):
        class MajorInline(NestedTabularInline):
            model = Major
            extra = 0

        extra = 0
        model = Campus
        inlines = [MajorInline]

    inlines = [CampusInline]


@admin.register(User)
class UserAdmin(BaseAdmin):
    class UserInformationAdmin(StackedInline):
        model = UserInformation

    model = User
    extra = 0
    inlines = [UserInformationAdmin]


@admin.register(Community)
class CommunityAdmin(NestedModelAdmin):
    class CommunityDepartmentAdmin(NestedStackedInline):
        model = CommunityDepartment
        extra = 0

    #
    class cUserAdmin(NestedStackedInline):
        model = User.joinedCommunities.through
        extra = 0

    model = Community
    inlines = [CommunityDepartmentAdmin, cUserAdmin]


# Register your models here.


admin.site.register(RegistrationForm)
admin.site.register(CommunityCategory)
