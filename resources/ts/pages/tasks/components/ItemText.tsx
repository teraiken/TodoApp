import { FC } from "react";
import { Task } from "../../../types/Task";
import { useDeleteTask } from "../../../queries/TaskQuery";

type Props = {
    task: Task;
    handleToggleEdit: () => void;
};

const ItemText: FC<Props> = ({ task, handleToggleEdit }) => {
    const deleteTask = useDeleteTask();

    return (
        <>
            <div onClick={handleToggleEdit}>
                <span>{task.title}</span>
            </div>

            <button
                className="btn is-delete"
                onClick={() => deleteTask.mutate(task.id)}
            >
                削除
            </button>
        </>
    );
};

export default ItemText;
