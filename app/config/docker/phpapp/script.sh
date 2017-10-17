#!/usr/bin/env bash
composer.phar install --no-interaction

exec $@
