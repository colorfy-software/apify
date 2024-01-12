# @colorfy-software/apify

> This is a simple wrapper for fetch to write less code and have stuff typed

[![NPM](https://img.shields.io/npm/v/@colorfy-software/apify.svg)](https://www.npmjs.com/package/@colorfy-software/apify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Installation

    $ yarn add @colorfy-software/apify

# Usage

## Creating a request

```typescript
// api/requests.ts

import { CreateRequest, CreateRequestType } from '@colorfy-software/apify'

// Define request type
interface CreatePostReqType {
  title: string
  body: string
  userId: number
}

// Define response type
interface CreatePostResType {
  id: number
  title: string
  body: string
  userId: number
}

// Combine types
type CretePostType = CreateRequestType<CreatePostReqType, CreatePostResType>

// Create request
const createPost = new CreateRequest<CretePostType>('/posts')

// Export all requests
export default { createPost }
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
api('createPost', {
  userId: 1,
  body: 'This be a post',
  title: 'This be the title of the post',
}).then((res) => {
  const { body, userId, title, id } = res
})
```
