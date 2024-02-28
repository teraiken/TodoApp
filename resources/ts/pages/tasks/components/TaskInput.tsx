import { FC, useState } from "react";
import { useCreateTask } from "../../../queries/TaskQuery";

const TaskInput: FC = () => {
    const [title, setTitle] = useState("");
    const createTask = useCreateTask();

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        createTask.mutate(title);
        setTitle("");
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <div className="inner">
                <input
                    type="text"
                    className="input"
                    placeholder="TODOを入力してください。"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button className="btn is-primary">追加</button>
            </div>
        </form>
    );
};

export default TaskInput;
