FROM 4devs/phpfpm:7.1

RUN yum -y install php-pdo php-mysql

ADD script.sh /
RUN chmod +x /script.sh
RUN chown -R nginx:nginx /var/log/php-fpm/ /run/php-fpm/ /var/lib/php/

EXPOSE 9000

RUN sed -i 's/daemonize = yes/daemonize = no/g' /etc/php-fpm.conf

ENTRYPOINT [ "/script.sh" ]

CMD ["php-fpm"]
