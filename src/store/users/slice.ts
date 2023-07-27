import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { UserId } from "../../types/user";
import { User, UserWithId } from "../../interfaces/User";

const DEFAULT_STATE = [
    {
        id: '1',
        name: 'Yazman Rodríguez',
        email: 'yazmanito@gmail.com',
        github: 'yazmanito',
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'leo@gmail.com',
        github: 'leo',
    },
    {
        id: '3',
        name: 'Haakon Dahlberg',
        email: 'haakon@gmail.com',
        github: 'haakon',
    },
];

const initialState: UserWithId[] = (() => {
    const usersLocalStorage = localStorage.getItem('users_redux');
    return usersLocalStorage ? JSON.parse(usersLocalStorage).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            return [...state, { id, ...action.payload }];
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id);
        },
    },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById } = usersSlice.actions;
