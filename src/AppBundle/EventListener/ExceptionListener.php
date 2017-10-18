<?php

namespace AppBundle\EventListener;

use AppBundle\Exception\HttpExceptionInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface as SymfonyHttpException;

class ExceptionListener
{
    /**
     * @param GetResponseForExceptionEvent $event
     */
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        // You get the exception object from the received event
        $exception = $event->getException();

        $data = [
            'error' => $exception->getMessage(),
            'code' => $exception->getCode()
        ];
        // Customize your response object to display the exception details
        $response = new JsonResponse();

        // HttpExceptionInterface is a special type of exception that
        if ($exception instanceof HttpExceptionInterface) {
            $data['errors'] = $exception->getErrors();
        }
        // holds status code and header details
        if ($exception instanceof SymfonyHttpException) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $response->setData($data);

        // Send the modified response object to the event
        $event->setResponse($response);
    }
}
