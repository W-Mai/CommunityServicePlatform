from django.contrib import admin
from .models import *
from django.contrib.admin import ModelAdmin, TabularInline, StackedInline
from nested_admin.nested import NestedModelAdmin, NestedTabularInline, NestedStackedInline
from django.utils.translation import gettext_lazy as _
from mdeditor.widgets import MDEditorWidget


class BaseAdmin(ModelAdmin):
    readonly_fields = ('id',)


@admin.register(Campus)
class CampusAdmin(BaseAdmin):
    search_fields = ["university__name", "name"]


@admin.register(College)
class CampusAdmin(BaseAdmin):
    search_fields = ["campus__name", "name"]


@admin.register(University)
class UniversityAdmin(NestedModelAdmin):
    class CampusInline(NestedTabularInline):
        class CollegeInline(NestedTabularInline):
            model = College
            extra = 0

        extra = 0
        model = Campus
        inlines = [CollegeInline]

    @admin.display(description=_("Campus"))
    def campus(self, obj: University):
        return [f"{c.name}({c.address})" for c in obj.campus_set.all()]

    list_display = ["name", "description", "campus"]
    search_fields = ["name", "campus__address", "description"]
    inlines = [CampusInline]


@admin.register(User)
class UserAdmin(BaseAdmin):
    class UserInformationAdmin(StackedInline):
        model = UserInformation

        # autocomplete_fields = ["university", "campus", "college"]

    @admin.display(description=_("Real Name"))
    def realName(self, obj: User):
        return obj.userinformation.name

    @admin.display(description=_("School Information`"))
    def schoolInformation(self, obj: User):
        info = obj.userinformation
        college = info.college
        campus = info.campus
        university = info.university
        return f"{university}({campus}), {college}, {info.college}"

    @admin.display(description=_("Other Information"))
    def otherInform(self, obj: User):
        info = obj.userinformation
        return f"{info.gender} - {info.schoolNumber}"

    model = User
    extra = 0
    list_display = ["username", "realName", "otherInform", "schoolInformation"]
    list_filter = [
        "userinformation__gender",
        "userinformation__national",
        # "userinformation__college__campus__university__name",
        # "userinformation__college__campus__name",
    ]
    list_select_related = True
    search_fields = ["username", "userinformation__name"]
    date_hierarchy = "userinformation__birthday"
    inlines = [UserInformationAdmin]


@admin.register(Community)
class CommunityAdmin(NestedModelAdmin):
    class CommunityDepartmentAdmin(NestedStackedInline):
        model = CommunityDepartment
        extra = 0

    class cUserAdmin(NestedStackedInline):
        model = User.joinedCommunities.through
        extra = 0

    @admin.display(description=_("Departments"))
    def departments(self, obj: Community):
        return [d.name for d in obj.communitydepartment_set.all()]

    model = Community
    list_display = ["name", "campusFullName", "departments", "category"]
    list_filter = ["campus__university__name", "category", "communitydepartment__name"]
    search_fields = ["name", "information", "campus__university__name", "communitydepartment__name"]
    inlines = [CommunityDepartmentAdmin, cUserAdmin]


@admin.register(RegistrationForm)
class RegistrationFormAdmin(NestedModelAdmin):

    @admin.display(description=_("Expected Departments"))
    def departments(self, obj: RegistrationForm):
        return obj.department1, obj.department2

    model = RegistrationForm
    list_display = ["__str__", "whetherToAdjust", "departments", "selfAssessment", "message"]
    list_filter = [
        "whetherToAdjust",
        # "user__userinformation__college__campus__university__name",
        "user__userinformation__college",
        # "user__userinformation__college__campus__name",
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
    list_select_related = True


# Register your models here.

admin.site.register(CommunityCategory)
admin.site.site_header = _("Community Management System")
admin.site.site_title = _("Information Management")
