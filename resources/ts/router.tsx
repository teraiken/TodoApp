import { FC, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import HelpPage from "./pages/help";
import LoginPage from "./pages/login";
import TaskPage from "./pages/tasks";
import { useLogout, useUser } from "./queries/AuthQuery";
import { useAuth } from "./hooks/AuthContext";
import NotFoundPage from "./pages/error";

const Router: FC = () => {
    const logout = useLogout();
    const { isAuth, setIsAuth } = useAuth();
    const { isLoading, data: authUser } = useUser();

    useEffect(() => {
        if (authUser) {
            setIsAuth(true);
        }
    }, [authUser]);

    const navigation = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li onClick={() => logout.mutate()}>
                    <span>ログアウト</span>
                </li>
            </ul>
        </header>
    );

    const LoginNavigation = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li>
                    <Link to="/login">ログイン</Link>
                </li>
            </ul>
        </header>
    );

    if (isLoading) return <div className="loader" />;

    return (
        <BrowserRouter>
            <div>
                {isAuth ? navigation : LoginNavigation}

                <Routes>
                    <Route path="/help" element={<HelpPage />} />
                    <Route
                        path="/login"
                        element={
                            isAuth ? <Navigate replace to="/" /> : <LoginPage />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <TaskPage />
                            ) : (
                                <Navigate replace to="/login" />
                            )
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;
