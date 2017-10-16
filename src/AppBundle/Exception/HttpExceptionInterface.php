<?php

namespace AppBundle\Exception;

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface as BaseHttpExceptionInterface;

interface HttpExceptionInterface extends BaseHttpExceptionInterface
{
    /**
     * @return array
     */
    public function getErrors(): array;
}
