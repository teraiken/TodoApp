import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HelpPage from "./pages/help";
import LoginPage from "./pages/login";
import TaskPage from "./pages/tasks";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <div>
                <header className="global-head">
                    <ul>
                        <li>
                            <Link to="/">ホーム</Link>
                        </li>
                        <li>
                            <Link to="/help">ヘルプ</Link>
                        </li>
                        <li>
                            <Link to="/login">ログイン</Link>
                        </li>
                        <li>
                            <span>ログアウト</span>
                        </li>
                    </ul>
                </header>

                <Routes>
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<TaskPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
