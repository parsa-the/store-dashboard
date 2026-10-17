import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../api/axiosCofig";

const useCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });
};

export default useCategories;