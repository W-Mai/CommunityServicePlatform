FROM python:3.8

# create workspace
RUN mkdir -p /wwwroot/server
WORKDIR /wwwroot/server/

# install requirements
COPY ./requirements.txt .
RUN python -m pip install --upgrade pip  \
    && pip install -r ./requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# copy works
COPY . /wwwroot/server

# migrate db
CMD python -m manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]