import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost){
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    console.log("passando dentro do filter")

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      message: errorResponse !== '' ? errorResponse : "Erro ao realizar essa operação."
    })
  }
}