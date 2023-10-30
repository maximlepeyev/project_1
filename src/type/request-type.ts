import { Request } from "express"

export type RequestParamType<P> = Request<P, {}, {}, {}>
export type RequestBodyType<B> = Request<{}, {}, B, {}>
export type RequestBodyAndParamType<P, B> = Request<P, {}, B, {}>