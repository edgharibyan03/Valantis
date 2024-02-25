/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { getFields, getPostsFields } from "../../../app/slices/posts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

interface props {
  // filterObj: {
  //   price: number,
  //   brand: null | string,
  //   product: string
  // },
  handleSetFilters: (obj: {
    price?: number,
    brand?: null | string,
    product?: string
  }) => void,
}

export default function Filters({
  handleSetFilters
}: props) {

  const dispatch = useAppDispatch();

  const timerId = useRef<any>(null)

  const postsFields = useAppSelector(getPostsFields)

  const handleGetPosts = useCallback((obj: any) => {
    clearTimeout(timerId.current)

    timerId.current = setTimeout(() => {
      handleSetFilters(obj)
    }, 300);
  }, [timerId])

  const handleGetFields = useCallback((field: string) => {
    dispatch(getFields({
      field,
      cb: () => handleGetFields(field)
    }))
  }, [])

  useEffect(() => {
    handleGetFields('')
  }, [])

  useEffect(() => {
    postsFields.list.forEach(handleGetFields)
  }, [postsFields.list])

  return (
    <div className="posts-filters">
      <input type="text" placeholder="Product" onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          handleGetPosts({
            product: +e.target.value
          })
        }
      }} onChange={e => handleGetPosts({
        product: e.target.value
      })} />
      <input type="number" placeholder="Price" onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          handleGetPosts({
            price: +e.target.value
          })
        }
      }} onChange={e => handleGetPosts({
        price: +e.target.value
      })} />
      <select name="brand" onChange={e => {
        handleGetPosts({
          brand: e.target.value
        })
      }}>
        <option value={''}>Не указано</option>
        {postsFields.fieldsValues['brand']?.filter((item: any) => Boolean(item)).map((item: string) => {
          return (
            <option value={item}>{item}</option>
          )
        })}
      </select>
    </div>
  )
}