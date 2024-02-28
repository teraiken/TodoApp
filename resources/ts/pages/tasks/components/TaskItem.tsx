import React, { FC, useState } from "react";
import { Task } from "../../../types/Task";
import { useUpdateDoneTask, useUpdateTask } from "../../../queries/TaskQuery";
import ItemInput from "./ItemInput";
import ItemText from "./ItemText";
import { toast } from "react-toastify";

type Props = {
    task: Task;
};

const TaskItem: FC<Props> = ({ task }) => {
    const updateDoneTask = useUpdateDoneTask();
    const updateTask = useUpdateTask();

    const [editTitle, setEditTitle] = useState<string | undefined>(undefined);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setEditTitle(e.target.value);
    };

    const handleUpdate = (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.FormEvent<HTMLFormElement>
    ): void => {
        e.preventDefault();

        if (!editTitle) {
            toast.error("タイトルを入力してください");
            return;
        }

        const newTask = { ...task };
        newTask.title = editTitle;

        updateTask.mutate({
            id: task.id,
            task: newTask,
        });

        setEditTitle(undefined);
    };

    const handleToggleEdit = (): void => {
        setEditTitle(task.title);
    };

    const handleOnKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (["Escape", "Tab"].includes(e.key)) {
            setEditTitle(undefined);
        }
    };

    return (
        <li className={task.is_done ? "done" : ""}>
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={() => updateDoneTask.mutate(task)}
                />
            </label>

            {editTitle === undefined ? (
                <ItemText task={task} handleToggleEdit={handleToggleEdit} />
            ) : (
                <ItemInput
                    editTitle={editTitle}
                    handleOnKey={handleOnKey}
                    handleInputChange={handleInputChange}
                    handleUpdate={handleUpdate}
                />
            )}
        </li>
    );
};

export default TaskItem;
