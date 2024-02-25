/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postItem } from '../../interfaces/posts'
import API from '../../services/API'
import { RootState } from '../store'

interface CounterState {
  posts: {
    list: postItem[],
    loading: boolean
  },
  fields: {
    list: string[],
    fieldsValues: any
  }
}

const initialState: CounterState = {
  posts: {
    list: [],
    loading: false
  },
  fields: {
    list: [],
    fieldsValues: {}
  }
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({
    filterObj,
    cb
  }: {
    filterObj: {
      offset: number,
      limit: number
    },
    cb: any
  }) => {
    try {
      const postsIds = await API.post('', {
        "action": "get_ids",
        "params": filterObj
      })

      const response = await API.post('', {
        "action": "get_items",
        "params": { "ids": postsIds.data.result }
      })

      return response.data;
    } catch (error) {
      cb()

      console.log(error);
    }
  }
)

export const getFields = createAsyncThunk(
  'posts/getFields',
  async ({
    field,
    cb
  }: {
    field: null | string,
    cb: any
  }) => {
    try {
      const response = await API.post('', {
        "action": 'get_fields',
        "params": field ? { field, offset: 0, limit: 30000 } : undefined
      })

      return {
        field,
        list: response.data.result
      }
    } catch (error) {
      cb()

      console.log(error);
    }
  }
)

export const getPostsByFilters = createAsyncThunk(
  'posts/getPostsByFilters',
  async ({
    filterObj,
    cb,
  }: {
    filterObj: {
      price: number,
      brand: null | string,
      product: string
    },
    cb: any
  }) => {
    try {
      const postsIds = await API.post('', {
        "action": "filter",
        "params": filterObj
      })

      const response = await API.post('', {
        "action": "get_items",
        "params": { "ids": postsIds.data.result }
      })


      return response.data;
    } catch (error) {
      cb()

      console.log(error)
    }
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.posts.loading = true
    })
    builder.addCase(getPosts.fulfilled, (state, action: any) => {
      state.posts.list = action.payload.result
      state.posts.loading = false
    })

    builder.addCase(getPostsByFilters.pending, (state) => {
      state.posts.loading = true
    })
    builder.addCase(getPostsByFilters.fulfilled, (state, action: any) => {
      state.posts.list = action.payload.result
      state.posts.loading = false
    })

    builder.addCase(getFields.fulfilled, (state, action: any) => {
      if (action.payload.field) {
        state.fields.fieldsValues[action.payload.field] = action.payload.list
      } else {
        state.fields.list = action.payload.list
      }

    })
  }
})

// export const { } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getPostsFields = (state: RootState) => state.posts.fields;
export const getPostsList = (state: RootState) => state.posts.posts;

export default postsSlice.reducer