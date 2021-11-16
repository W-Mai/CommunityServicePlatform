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

    def campus(self, obj: University):
        return [f"{c.name}({c.address})" for c in obj.campus_set.all()]

    list_display = ["name", "description", "campus"]
    search_fields = ["name", "campus__address", "description"]
    inlines = [CampusInline]


@admin.register(User)
class UserAdmin(BaseAdmin):
    class UserInformationAdmin(StackedInline):
        model = UserInformation

    def realName(self, obj: User):
        return obj.userinformation.name

    def schoolInformation(self, obj: User):
        info = obj.userinformation
        major = info.major
        campus = major.campus
        university = campus.university
        return f"{university}({campus}), {major}, {info.college}"

    def otherInform(self, obj: User):
        info = obj.userinformation
        return f"{info.gender} - {info.schoolNumber}"

    model = User
    extra = 0
    list_display = ["username", "realName", "otherInform", "schoolInformation"]
    list_filter = [
        "userinformation__gender",
        "userinformation__national",
        "userinformation__campus__university__name",
        "userinformation__campus__name",
    ]
    search_fields = ["username", "userinformation__name"]
    inlines = [UserInformationAdmin]


@admin.register(Community)
class CommunityAdmin(NestedModelAdmin):
    class CommunityDepartmentAdmin(NestedStackedInline):
        model = CommunityDepartment
        extra = 0

    class cUserAdmin(NestedStackedInline):
        model = User.joinedCommunities.through
        extra = 0

    def departments(self, obj: Community):
        return [d.name for d in obj.communitydepartment_set.all()]

    model = Community
    list_display = ["name", "campusFullName", "departments", "category"]
    list_filter = ["campus__university__name", "category", "communitydepartment__name"]
    search_fields = ["campus__university__name", "communitydepartment__name"]
    inlines = [CommunityDepartmentAdmin, cUserAdmin]


@admin.register(RegistrationForm)
class RegistrationFormAdmin(NestedModelAdmin):

    def departments(self, obj: RegistrationForm):
        return obj.department1, obj.department2

    model = RegistrationForm
    list_display = ["__str__", "whetherToAdjust", "departments", "selfAssessment", "message"]
    list_filter = [
        "whetherToAdjust",
        "user__userinformation__campus__university__name",
        "user__userinformation__college",
        "user__userinformation__campus__name",
        "community__name",
        "department1",
        "department2",
    ]
    search_fields = [
        "user__userinformation__campus__university__name",
        "user__userinformation__college",
        "user__userinformation__campus__name",
        "community__name",
        "user__userinformation__schoolNumber",
        "user__userinformation__name"
    ]


# Register your models here.

admin.site.register(CommunityCategory)
