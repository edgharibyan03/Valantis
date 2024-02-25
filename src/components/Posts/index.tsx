/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts, getPostsByFilters, getPostsList } from "../../app/slices/posts";
import PostsPagination from "./PostsPagination";
import ProgressBar from "../CircularProgress";
import PostsList from "./PostsList";
import './style.scss'
import Filters from "./Filters";

export default function Posts() {
  const dispatch = useAppDispatch()

  const postsList = useAppSelector(getPostsList);

  const [paginationObj, setPaginationObj] = useState<{
    offset: number,
    limit: number
  }>({
    offset: 0,
    limit: 50
  })

  // const [showPagination, setShowPagination] = useState<boolean>(true)

  // const [filterObj, setFilterObj] = useState<{
  //   price: number,
  //   brand: null | string,
  //   product: string
  // }>({
  //   price: 0,
  //   brand: null,
  //   product: ''
  // })

  const handleGetPosts = useCallback((filterObj: {
    offset: number,
    limit: number
  }) => {
    dispatch(getPosts({ filterObj, cb: () => handleGetPosts(filterObj) }))
  }, [])

  const handleChangePagination = useCallback((action: 'increment' | 'decrement') => {
    setPaginationObj(prev => {
      const newObj = {
        offset: action === 'increment' ? prev.offset + 50 : prev.offset - 50,
        limit: 50
      }

      handleGetPosts(newObj)

      return newObj
    })
  }, [])

  const handleGetPostsByFilters = useCallback((newObj: any) => {
    dispatch(getPostsByFilters({
      filterObj: newObj,
      cb: () => handleGetPostsByFilters(newObj)
    }))
  }, [])

  const handleSetFilters = useCallback((obj: {
    price?: number,
    brand?: null | string,
    product?: string
  }) => {
    if (obj.brand || obj.price || obj.product) {
      handleGetPostsByFilters(obj)
      // setShowPagination(false)
    } else {
      handleGetPosts(paginationObj)
      // setShowPagination(true)
    }
    // setFilterObj(prev => {
    //   const newObj = {
    //     ...prev,
    //     ...obj
    //   }


    //   return newObj
    // })

  }, [])

  useEffect(() => {
    handleGetPosts(paginationObj)
  }, [])

  return (
    <div className="posts">
      <Filters
        // filterObj={filterObj}
        handleSetFilters={handleSetFilters}
      />
      {
        postsList.loading ? <ProgressBar /> : <>
          <PostsList
            postsList={postsList.list}
          />
          <PostsPagination
            filterObj={paginationObj}
            postsList={postsList.list}
            handleChangePagination={handleChangePagination}
          />
        </>
      }
    </div>
  )
}