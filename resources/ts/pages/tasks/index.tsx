import { FC } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const TaskPage: FC = () => {
    return (
        <>
            <TaskInput />
            <TaskList />
        </>
    );
};

export default TaskPage;
