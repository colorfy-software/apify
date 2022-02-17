/// <reference types="typescript" />

declare module '@colorfy-software/apify' {
  interface RequestOptionType {
    responseType?: 'json' | 'text'
  }
  interface onErrorPramType<T> {
    requestName: keyof T
    message: Error
  }
  export interface CreateRequestType<K, V> {
    params: K
    response: V
  }
  export class CreateRequest<
    T extends {
      params: T['params']
      response: T['response']
    },
  > {
    endpoint: string
    options?: RequestOptionType & Omit<RequestInit, 'body'>
    constructor(endpoint: string, options?: RequestOptionType & Omit<RequestInit, 'body'>)
    request: (body: T['params'], baseUrl?: string | undefined) => Promise<T['response']>
  }
  export const APIConstructor: <
    T extends Record<
      PropertyKey,
      {
        request: (...a: any[]) => any
      }
    >,
  >(
    reqs: T,
    options?:
      | {
          baseUrl?: string | undefined
          onRequestStart?:
            | (<K extends keyof T>(request: { requestName: K; params: Parameters<T[K]['request']> }) => void)
            | undefined
          onError?: ((error: onErrorPramType<T>) => void) | undefined
          onSuccess?:
            | (<K_1 extends keyof T>(response: { requestName: K_1; response: ReturnType<T[K_1]['request']> }) => void)
            | undefined
        }
      | undefined,
  ) => <K_2 extends keyof T>(key: K_2, ...params: Parameters<T[K_2]['request']>) => ReturnType<T[K_2]['request']>
}
