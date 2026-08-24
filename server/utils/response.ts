import { setResponseStatus } from 'h3'
import { HttpStatus, HttpStatusCode } from '~~/server/utils/httpStatus'

export function sendResponseSuccess<Data, Meta>(
    event: any, 
    {
      data,
      meta,
      statusCode = HttpStatus.Ok,
    }: {
      data: Data, 
      meta?: Meta
      statusCode?: HttpStatusCode
    }
) {
  setResponseStatus(event, statusCode)
  return {
    success: true as const,
    data,
    meta,
  }
}

