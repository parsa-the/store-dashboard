import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../../utils/axiosCofig";

const useProductDetails = (id:number | undefined) => {
  return (
    useQuery({
        queryKey:["product",id],
        queryFn:()=>fetchProductById(Number(id))
    })
  )
}

export default useProductDetails