import { IUser } from "src/app/models/user.interface";

export interface IUserState {
    user: IUser | null;
    error: string | null;
    isLogged: boolean;
    access_token: string | null;
}

export const initialUserState: IUserState = {
    user: null,
    error: null,
    isLogged: false,
    access_token: null
}
