from typing import Optional

from django.db.models import *


# Create your models here.

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
    name = CharField('University name')
    description = TextField("What's up")
    campus = ForeignKey("Campus", related_name="university", on_delete=SET_NULL, null=True)


class Campus(BaseModel):
    name = CharField("Campus Name")
    address = CharField("Address of this campus")
    description = TextField("What's up")
    majors = ForeignKey("Major", related_name="campus", on_delete=SET_NULL, null=True)


class Major(BaseModel):
    name = CharField("Major Name")
    description = TextField("What's Up")


# User related models

class UserGroup(TextChoices):
    student = "STUDENT"
    teacher = "TEACHER"
    admin = "ADMIN"


class Gender(TextChoices):
    male = "MALE"
    female = "FEMALE"
    others = "OTHERS"


class UserGroupField(CharField):
    def __init__(self, *args, choices=UserGroup.choices, default=UserGroup.student, **kwargs):
        super().__init__(*args, choices=choices, default=default, **kwargs)


class GenderField(CharField):
    def __init__(self, *args, choices=Gender.choices, default=Gender.others, **kwargs):
        super().__init__(*args, choices=choices, default=default, **kwargs)


class User(BaseModel):
    openid = CharField("wx openid")
    username = CharField()
    password = TextField()
    isVerified = BooleanField()
    group = UserGroupField()
    information = OneToOneField("UserInformation", on_delete=CASCADE)
    joinedCommunities = ManyToManyField("Community")


class UserInformation(BaseModel):
    tel = CharField("Telephone Number")
    name = CharField("What's your name")
    schoolNumber = CharField("School Number or some IDs")
    QQ = CharField("QQ Number (A social media platform)")
    college = CharField("What's your college")
    gender = GenderField()
    politicalLandscape = CharField()
    national = CharField()
    birthday = DateField()
    nativePlace = CharField()
    headPortrait = CharField()
    personalProfile = TextField("Introduce yourself")
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True)
    major = ForeignKey("Major", on_delete=SET_NULL, null=True)


# Community related models

class Community(BaseModel):
    name = CharField("Community name")
    rank = FloatField(default=0.0)
    information = TextField("What's up")
    department = ForeignKey("CommunityDepartment")
    images = JSONField()
    thumbnail = CharField()
    qqGroup = CharField()
    openUpDateStart = DateTimeField()
    openUpDateEnd = DateTimeField()
    message = TextField("Message this community will notice")
    category = ForeignKey("CommunityCategory", on_delete=SET_NULL, null=True)
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True)


class CommunityDepartment(BaseModel):
    name = CharField("Department name")
    information = TextField("What's up")


class CommunityCategory(BaseModel):
    name = CharField("Category name")
    information = TextField("What's up")
    logo = CharField()


# Registration related models

class RegistrationForm(BaseModel):
    user = ForeignKey("User", on_delete=SET_NULL, null=True)
    community = ForeignKey("Community", on_delete=SET_NULL, null=True)
    whetherToAdjust = BooleanField()
    department1 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True)
    department2 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True)
    # status =
    message = TextField()
