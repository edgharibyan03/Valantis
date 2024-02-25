import { postItem } from "../interfaces/posts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function uniqBy(arr: postItem[]) {
  return arr.filter(
    (obj: postItem, index: number) =>
      arr.findIndex((item: postItem) => item.id === obj.id) === index
  );
}