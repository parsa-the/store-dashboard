import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../utils/axiosCofig";

const useCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });
};

export default useCategories;
