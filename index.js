class CreateRequest {
  constructor(endpoint, options) {
    this.request = (body, baseUrl) =>
      new Promise((resolve, reject) => {
        const endpoint = baseUrl ? `${baseUrl}${this.endpoint}` : this.endpoint
        const b = body ? { body: JSON.stringify(body) } : {}

        try {
          fetch(endpoint, Object.assign(Object.assign({}, this.options), b))
            .then(async (res) => {
              var _a
              if (res.status === 200 && res.ok) {
                try {
                  let parsedResponse
                  switch ((_a = this.options) === null || _a === void 0 ? void 0 : _a.responseType) {
                    case 'json':
                      parsedResponse = await res.json()
                      break
                    case 'text':
                      parsedResponse = await res.text()
                      break
                    default:
                      parsedResponse = await res.json()
                      break
                  }
                  resolve(parsedResponse)
                } catch (parseError) {
                  console.log({ parseError })
                  reject(parseError)
                }
              } else {
                reject(res)
              }
            })
            .catch((err) => {
              reject(err)
            })
        } catch (err) {
          reject(err)
        }
      })
    this.endpoint = endpoint
    this.options = options
  }
}
const APIConstructor = (reqs, options) => {
  return (key, ...params) => {
    const request = reqs[key]
    if (!request) {
      throw new Error(
        `Request name ${key} is not available. Available request names are ${Object.keys(reqs).join(', ')}`,
      )
    }
    return new Promise(async (resolve, reject) => {
      var _a, _b, _c
      try {
        ;(_a = options === null || options === void 0 ? void 0 : options.onRequestStart) === null || _a === void 0
          ? void 0
          : _a.call(options, { requestName: key, params })
        const res = await request.request(params, options === null || options === void 0 ? void 0 : options.baseUrl)
        ;(_b = options === null || options === void 0 ? void 0 : options.onSuccess) === null || _b === void 0
          ? void 0
          : _b.call(options, {
              requestName: key,
              response: res,
            })
        resolve(res)
      } catch (err) {
        ;(_c = options === null || options === void 0 ? void 0 : options.onError) === null || _c === void 0
          ? void 0
          : _c.call(options, err)
        reject(err)
      }
    })
  }
}
export { APIConstructor, CreateRequest }
