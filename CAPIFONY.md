Deploy with capifony
====================

## requirements for server
- git, zip, unzip
- php >= 7.1 with php-zip, php-pdo, php-xml, php-fpm
- nginx
- mysql

### init centos server
- create user `adduser symfony` and `su symfony`
- generate deploy key `ssh-keygen` and add to repository
- add repository to allowed `git clone git@github.com:4devs/symfony-react.git`
- add ssh key `mkdir ~/.ssh`, `vim ~/.ssh/authorized_keys`, `chmod 600 ~/.ssh/authorized_keys`, `chmod 700 ~/.ssh/`
- add user to nginx group `usermod -a -G nginx symfony`
- change group project folder `chgrp nginx /var/www/`, `chmod g+w /var/www/`
- add http to `firewall-cmd --permanent --add-service=http`
