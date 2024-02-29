import axios from "axios";
import { User } from "../types/User";

const getUser = async (): Promise<User> => {
    const { data } = await axios.get<User>("api/user");
    return data;
};

const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<User> => {
    const { data } = await axios.post<User>("api/login", { email, password });
    return data;
};

const logout = async (): Promise<boolean> => {
    const { data } = await axios.post<boolean>("api/logout");
    return data;
};

export { getUser, login, logout };
