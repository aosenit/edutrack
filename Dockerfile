FROM node:12.14 as build-step1
#FROM node:12-alipne


RUN mkdir -p /school

WORKDIR /school

COPY package.json  ./
#RUN npm install @angular-devkit/build-angular
RUN npm install --force
RUN npm install -g @angular/cli@8
#RUN npm install nodejs
#RUN npm install

#WORKDIR ./nibss1/

COPY . /school
#COPY . .
#RUN npm install @angular-devkit/build-angular
RUN  ng build --prod 
#RUN ng build --configuration=production
#COPY --from=build-step1 web.config /home/ebills-admin/current-frontend/Ebills-Frontend/ebills-admin-app /nibss-admin/dist/ebills-admin
#

FROM nginx:1.17.1-alpine



COPY --from=build-step1 /school/dist  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
