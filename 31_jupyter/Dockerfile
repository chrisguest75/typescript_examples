FROM python:3.9.2-slim-buster

RUN pip install pipenv

ARG USERID=1000
ARG GROUPID=1000
RUN addgroup --system --gid $GROUPID appuser
RUN adduser --system --uid $USERID --gid $GROUPID appuser

RUN mkdir /workbench

WORKDIR /workbench
COPY ./Pipfile /workbench/Pipfile
COPY ./Pipfile.lock /workbench/Pipfile.lock 

#RUN set -ex && pipenv install --deploy --system
RUN pipenv install --deploy --system --dev
COPY ./books /workbench/books

USER appuser
EXPOSE 8888
CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--port", "8888"]
