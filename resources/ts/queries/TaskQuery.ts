import { toast } from "react-toastify";
import * as api from "../api/TaskAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useTasks = () => {
    return useQuery("tasks", () => api.getTasks());
};

const useUpdateDoneTask = () => {
    const queryClient = useQueryClient();

    return useMutation(api.updateDoneTask, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks");
        },
        onError: () => {
            toast.error("更新に失敗しました。");
        },
    });
};

export { useTasks, useUpdateDoneTask };
