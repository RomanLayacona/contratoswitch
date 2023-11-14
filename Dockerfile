# Utiliza la imagen base httpd:2.4-alpine
FROM httpd:2.4-alpine
COPY . .
RUN apk add --update nodejs npm
RUN npm ci
RUN npm install -g @angular/cli@14.2.10
RUN npm run build --configuration=staging
RUN cp -r ./dist/domus/* /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
RUN ls -la /usr/local/apache2/htdocs/
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN { echo 'IncludeOptional conf.d/*.conf';} >> /usr/local/apache2/conf/httpd.conf && mkdir /usr/local/apache2/conf.d
#RUN chown -R www-data:www-data /usr/local/apache2/htdocs/
#RUN rm -rf /usr/local/apache2/htdocs/temporary-file
#RUN rm -rf /var/cache/apk/*