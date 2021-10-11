import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleTimeString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };
    Logger.error(`${request.url}`, JSON.stringify(errorResponse), 'Exception');
    response.status(status).json(errorResponse);
  }
}
