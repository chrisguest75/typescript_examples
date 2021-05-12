FROM node:
# do the build here

FROM nginx:1.17.10 

WORKDIR /usr/share/nginx/html
# copy the build
COPY dist ./



