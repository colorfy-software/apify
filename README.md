# @colorfy-software/apify

This is a simple wrapper for fetch to write less code.

# Installation

    $ yarn add @colorfy-software/apify

# Usage

## Creating a request

```typescript
// api/requests.ts

import { CreateRequest, CreateRequestType } from '@colorfy-software/apify'

// Define request param types if needed
// interface GetTodoReqType {
//   userId: number
//   id: number
// }

// Define the types
interface GetTodoResType {
  userId: number
  id: number
  title: string
  completed: boolean
}

// You can mix and match these depending on what your API endpoint does
type GetTodo = CreateRequestType<undefined, GetTodoResType>
// type GetTodo = CreateRequestType<GetTodoReqType, GetTodoResType>

// Create request
const getTodo = new CreateRequest<GetTodo>('/todos/1')

// Export all requests
export default { getTodo }
```

## Creating api interface

```typescript
// api/index.ts

import { APIConstructor } from '@colorfy-software/apify'

// Import requests from prev file
import requests from './requests'

// Create API function
const api = APIConstructor<typeof requests>(requests, {
  baseUrl: 'https://jsonplaceholder.typicode.com', // Can define base url
  // Can hook into life-cycle events
  onRequestStart: ({ requestName, params }) => {
    console.log('ON REQUEST START:', { requestName, params })
  },
  onSuccess: ({ requestName, response }) => {
    console.log('ON SUCCESS: ', { requestName, response })
  },
  onError: ({ requestName, error }) => {
    console.log('ON ERROR: ', { requestName, error })
  },
})

export default api
```

## Consuming the api

```typescript
// any-file.ts

import api from '../api'

// ready to be used and is all typed
api('getTodo').then((res) => {
  console.log({ res })
})
```
