import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor(message = 'Authentication failed') {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
