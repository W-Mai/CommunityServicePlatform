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
    name = CharField('University name', max_length=50)
    description = TextField("What's up")


class Campus(BaseModel):
    name = CharField("Campus Name", max_length=50)
    address = CharField("Address of this campus", max_length=100)
    description = TextField("What's up")
    university = ForeignKey("University", on_delete=SET_NULL, null=True)


class Major(BaseModel):
    name = CharField("Major Name", max_length=50)
    description = TextField("What's Up")
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True)


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
    def __init__(self, *args, choices=UserGroup.choices, default=UserGroup.student, max_length=20, **kwargs):
        super().__init__(*args, choices=choices, default=default, max_length=max_length, **kwargs)


class GenderField(CharField):
    def __init__(self, *args, choices=Gender.choices, default=Gender.others, max_length=20, **kwargs):
        super().__init__(*args, choices=choices, default=default, max_length=max_length, **kwargs)


class User(BaseModel):
    openid = CharField("wx openid", max_length=50)
    username = CharField(max_length=50)
    password = TextField()
    isVerified = BooleanField()
    group = UserGroupField()
    joinedCommunities = ManyToManyField("Community", symmetrical=False)


class UserInformation(BaseModel):
    tel = CharField("Telephone Number", max_length=20)
    name = CharField("What's your name", max_length=16)
    schoolNumber = CharField("School Number or some IDs", max_length=30)
    QQ = CharField("QQ Number (A social media platform)", max_length=20)
    college = CharField("What's your college", max_length=50)
    gender = GenderField()
    politicalLandscape = CharField(max_length=20)
    national = CharField(max_length=50)
    birthday = DateField()
    nativePlace = CharField(max_length=50)
    headPortrait = TextField()
    personalProfile = TextField("Introduce yourself")
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True)
    major = ForeignKey("Major", on_delete=SET_NULL, null=True)

    user = OneToOneField("User", on_delete=CASCADE, null=True)


# Community related models

class Community(BaseModel):
    name = CharField("Community name", max_length=50)
    rank = FloatField(default=0.0)
    information = TextField("What's up")
    images = JSONField()
    thumbnail = TextField()
    qqGroup = CharField(max_length=20)
    openUpDateStart = DateTimeField()
    openUpDateEnd = DateTimeField()
    message = TextField("Message this community will notice")
    category = ForeignKey("CommunityCategory", on_delete=SET_NULL, null=True)
    campus = ForeignKey("Campus", on_delete=SET_NULL, null=True)


class CommunityDepartment(BaseModel):
    name = CharField("Department name", max_length=50)
    information = TextField("What's up")
    community = ForeignKey("Community", on_delete=SET_NULL, null=True)


class CommunityCategory(BaseModel):
    name = CharField("Category name", max_length=50)
    information = TextField("What's up")
    logo = TextField()


# Registration related models

class RegistrationForm(BaseModel):
    user = ForeignKey("User", on_delete=SET_NULL, null=True)
    community = ForeignKey("Community", on_delete=SET_NULL, null=True)
    whetherToAdjust = BooleanField()
    department1 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True, related_name="registrationFormDepartment1")
    department2 = ForeignKey("CommunityDepartment", on_delete=SET_NULL, null=True, related_name="registrationFormDepartment2")
    # status =
    message = TextField()
