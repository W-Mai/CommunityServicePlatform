import datetime
import json

import sys; print('Python %s on %s' % (sys.version, sys.platform))
import django; print('Django %s' % django.get_version())
if 'setup' in dir(django): django.setup()

from api.models import *

print(User.objects.all())

def readASInfo(path):
    res = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            res.append(json.loads(line))
    return res


def readApplyFormInfo(path):
    res = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            res.append(json.loads(line))
    return res


if __name__ == '__main__':
    university = University.objects.get(name="郑州轻工业大学")
    campus_kx = Campus.objects.get(name="科学校区")
    campus_df = Campus.objects.get(name="东风校区")

    cate_list = ["创新创业类",
                 "文化体育类",
                 "思想政治类",
                 "学术科技类",
                 "志愿公益类",
                 "自律互助类",
                 "校级组织"
                 ]
    categories = [CommunityCategory.objects.get(name=c) for c in cate_list]

    print(university, campus_kx, campus_df)


    asinfos = readASInfo("data/ASInformations-2020.11.02-16.11.json")
    applinfos = readApplyFormInfo("data/Application-Form-2020.11.02-16.11.json")

    print(asinfos[0])
    index = 1
    for com in asinfos:
        c = Community()
        c.name = com["name"]
        c.rank = 0.0
        c.information = com["information"]
        c.images = com["imgs"]
        c.thumbnail = com["thumbnail"]
        c.qqGroup = com["qqgroup"]
        c.message = com["msg"]
        c.category = categories[cate_list.index(com["category"])]
        c.campus = campus_kx if com["campus"] == "科学校区" else campus_df
        c.openUpDateStart = datetime.date.today()
        c.openUpDateEnd = datetime.date.today()
        c.id = index

        index += 1
        c.save()
        # print(c.category, com["category"])

