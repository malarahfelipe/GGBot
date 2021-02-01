
export const isRejected = (promise: PromiseSettledResult<any>): promise is PromiseRejectedResult => promise.status === 'rejected'

export const isFullfilled = (promise: PromiseSettledResult<any>): promise is PromiseFulfilledResult<any> => !isRejected(promise)
