import { type H3Event, setResponseStatus } from 'h3'
import { HttpStatus, type HttpStatusCode } from '~~/server/utils/httpStatus'

export function sendResponseSuccess<Data, Meta>(
    event: H3Event, 
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

