<?php

namespace AppBundle\Exception;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException as SymfonyBadRequestHttpException;

class BadRequestHttpException extends SymfonyBadRequestHttpException implements HttpExceptionInterface
{
    /**
     * @var array
     */
    private $errors = [];

    /**
     * BadRequestHttpException constructor.
     * @param array $errors
     * @param string $message
     * @param \Exception|null $previous
     * @param int $code
     */
    public function __construct(array $errors = [], $message = 'Bad Request', \Exception $previous = null, $code = 0)
    {
        parent::__construct($message, $previous, $code);
        $this->errors = $errors;
    }

    /**
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errors;
    }
}
