Symfony Application with React
==============================

* [**Symfony Standart Framework**][1] - The "Symfony Standard Edition" distribution http://symfony.com

Requirements for install
========================
* [**composer**][2]
* [**yarn**][3]

Install Application
===================

### create app
install [composer][2]
run command `composer create-project 4devs/symfony-react`

### use docker composer
install [docker][4]
run command `docker-compose up --build`
add to `/etc/hosts` host `127.0.0.1       symfony.local`

Use docker
==========
* exec php container `docker-compose exec phpapp bash`
* exec node container `docker-compose exec reactapp bash`

Enjoy!

[1]:  https://github.com/symfony/symfony-standard
[2]:  https://getcomposer.org/
[3]:  https://yarnpkg.com/
[4]:  https://www.docker.com/
