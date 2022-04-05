from typing import Optional

from django.db.models import *
from django.utils.translation import gettext_lazy as _

# Create your models here.
from django.contrib import admin
from mdeditor.fields import MDTextField


class BaseManager(Manager):
    def get(self, *args, **kwargs) -> Optional[Model]:
        try:
            return super().get(*args, **kwargs)
        except ObjectDoesNotExist:
            return None


class BaseModel(Model):
    class Meta:
        abstract = True

    objects = BaseManager()


# University related models
class University(BaseModel):
    name = CharField(_('University name'), max_length=50)
    description = TextField(("What’s Up"))

    class Meta:
        verbose_name = _("University")
        verbose_name_plural = _('University')

    def __str__(self):
        return f"{self.name}"


class Campus(BaseModel):
    name = CharField(_("Campus Name"), max_length=50)
    address = CharField(_("Address of this campus"), max_length=100)
    description = TextField(("What’s Up"))
    university = ForeignKey("University", on_delete=SET_NULL, null=True, verbose_name=_("University"))

    class Meta:
        verbose_name = _("Campus")
        verbose_name_plural = _('Campus')

    def __str__(self):
        return f"{self.name}"

    @property
    def fullName(self):
        return f"{self.university}({self.name})"


class College(BaseModel):
    name = CharField(_("College Name"), max_length=50)
    description = TextField(("What’s Up"))
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True, verbose_name=_("Campus"))

    class Meta:
        verbose_name = _("College")
        verbose_name_plural = _('College')

    def __str__(self):
        return f"{self.name}"


# User related models

class UserGroup(TextChoices):
    student = "STUDENT"
    teacher = "TEACHER"
    admin = "ADMIN"

    _("Student"), _("Teacher"), _("Admin")


class Gender(TextChoices):
    male = "MALE"
    female = "FEMALE"
    others = "OTHERS"

    _("Male"), _("Female"), _("Others")


class UserGroupField(CharField):
    def __init__(self, *args, choices=UserGroup.choices, default=UserGroup.student, max_length=20, **kwargs):
        tmp_choices = [(member[0], _(member[1])) for member in choices]
        super().__init__(*args, choices=tmp_choices, default=default, max_length=max_length, **kwargs)


class GenderField(CharField):
    def __init__(self, *args, choices=Gender.choices, default=Gender.others, max_length=20, **kwargs):
        tmp_choices = [(member[0], _(member[1])) for member in choices]
        super().__init__(*args, choices=tmp_choices, default=default, max_length=max_length, **kwargs)


class User(BaseModel):
    openid = CharField(_("wx openid"), max_length=50)
    username = CharField(_("Username"), max_length=50)
    password = TextField(_("Password"))
    isVerified = BooleanField(_("Is Verified"))
    group = UserGroupField(_("User Group"))
    joinedCommunities = ManyToManyField("Community", verbose_name=_("Joined Communities"), null=True)

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _('User')

    def __str__(self):
        return f"{self.username} - {self.userinformation.name}"


class UserInformation(BaseModel):
    tel = CharField(_("Telephone Number"), max_length=20)
    name = CharField(_("What's your name"), max_length=16)
    schoolNumber = CharField(_("School Number or some IDs"), max_length=30)
    QQ = CharField(_("QQ Number (A social media platform)"), max_length=20)
    major = CharField(_("What's your major"), max_length=50)
    gender = GenderField(_("Gender"))
    politicalLandscape = CharField(_("Political Landscape"), max_length=20)
    national = CharField(_("National"), max_length=50)
    birthday = DateField(_("Birthday"))
    nativePlace = CharField(_("Native Place"), max_length=50)
    headPortrait = TextField(_("Head Portrait"))
    personalProfile = TextField(_("Introduce yourself"))
    # university = ForeignKey("University", on_delete=SET_NULL, null=True)
    # campus = ForeignKey("Campus", on_delete=SET_NULL, null=True, verbose_name=_("Campus"))
    college = ForeignKey("College", on_delete=SET_NULL, null=True, verbose_name=_("College"))

    user = OneToOneField("User", on_delete=CASCADE, null=True, verbose_name=_("User"))

    class Meta:
        verbose_name = _("UserInformation")
        verbose_name_plural = _('UserInformation')

    def __str__(self):
        return f"{self.schoolNumber} - {self.name}"

    @property
    def university(self):
        return self.campus.university

    @property
    def campus(self):
        return self.college.campus


# Community related models

class Community(BaseModel):
    name = CharField(_("Community name"), max_length=50)
    rank = FloatField(_("Rank"), default=0.0)
    information = MDTextField(("What’s Up"))
    images = JSONField(_("Images"))
    thumbnail = TextField(_("Thumbnail"))
    qqGroup = CharField(_("QQ Group Number"), max_length=20)
    openUpDateStart = DateTimeField(_("Start Datetime of Recruiting New"))
    openUpDateEnd = DateTimeField(_("End Datetime of Recruiting New"))
    message = TextField(_("Message this community will notice"))
    category = ForeignKey("CommunityCategory", on_delete=SET_NULL, null=True, verbose_name=_("Community Category"))
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True, verbose_name=_("Campus"))

    class Meta:
        verbose_name = _("Community")
        verbose_name_plural = _('Community')

    def __str__(self):
        return f"{self.name}"

    @property
    @admin.display(description=_("Campus"))
    def campusFullName(self):
        return self.campus.fullName


class CommunityDepartment(BaseModel):
    name = CharField(_("Department name"), max_length=50)
    information = TextField(("What’s Up"))
    community = ForeignKey("Community", on_delete=SET_NULL, null=True, verbose_name=_("Community"))

    class Meta:
        verbose_name = _("CommunityDepartment")
        verbose_name_plural = _('CommunityDepartment')

    def __str__(self):
        return self.name


class CommunityCategory(BaseModel):
    name = CharField(_("Category name"), max_length=50)
    information = TextField(("What’s Up"))
    logo = TextField(_("Logo of this category"))

    class Meta:
        verbose_name = _("CommunityCategory")
        verbose_name_plural = _('CommunityCategory')

    def __str__(self):
        return self.name


# Registration related models

class RegistrationForm(BaseModel):
    user = ForeignKey("User", on_delete=SET_NULL, null=True, verbose_name=_("User"))
    community = ForeignKey("Community", on_delete=SET_NULL, null=True, verbose_name=_("Community"))
    whetherToAdjust = BooleanField(_("Whether To Adjust"))
    selfAssessment = TextField(_("Self introduce"))
    department1 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True,
                             related_name="registrationFormDepartment1", verbose_name=_("Department1"))
    department2 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True,
                             related_name="registrationFormDepartment2", verbose_name=_("Department2"))
    # status =
    message = TextField(_("Return Message"))

    class Meta:
        verbose_name = _("RegistrationForm")
        verbose_name_plural = _('RegistrationForm')

    def __str__(self):
        return f"{self.community}-{self.user}"
