import { useQuery } from "@tanstack/react-query";
import { get } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";
const useQueryData = (model: string, id?: number) => {
    let endPoint = getUrlForModel(model)
    if (id) {
        endPoint = getUrlForModel(model, id)
    }
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery({
        queryKey: ["Finding Data", model, id],
        queryFn: () => get(endPoint),
        select(data) {
            return data?.data
        },
    });
    const output = data ?? []
    return output
};

export default useQueryData;