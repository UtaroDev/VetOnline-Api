import type { Request } from 'express'

interface RequestParams {
  roleRequest?: string
  userIdRequest?: string
}

type Params<T = Request> = (params?: RequestParams) => T

export interface CustomRequest extends Request {
  customParams: Params<this>
}
