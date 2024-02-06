import type { Response } from 'express'

interface ResponseJsonBase {
  status: number
  statusMsg: string
}

interface ResponseJsonData extends ResponseJsonBase {
  data: any
}

interface ResponseJsonMessage extends ResponseJsonBase {
  message: string
}

interface ResponseJsonMessageError extends ResponseJsonMessage {
  error: string
}

// El body de la respuesta si existe y es Send tiene como opciones lo de ResponseJsonData y sino es de tipo Response
type Send<T = Response> = (body?: ResponseJsonData) => T
type SendMsg<T = Response> = (body?: ResponseJsonMessage) => T
type SendMsgError<T = Response> = (body?: ResponseJsonMessageError) => T

// El tipo CustomResponse data es de tipo Response y el json de adentro es de tipo Send que tiene las opciones de ResponseJsonData
export interface CustomResponseData extends Response {
  json: Send<this>
}

export interface CustomResponseMessage extends Response {
  json: SendMsg<this>
}

export interface CustomResponseMessageError extends Response {
  json: SendMsgError<this>
}
