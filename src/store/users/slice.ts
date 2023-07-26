import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { UserId } from "../../types/user";

interface User {
    name: string
    email: string
    github: string
}

interface UserWithId extends User {
    id: UserId
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id);
        },
    },
});

export default usersSlice.reducer;
export const { deleteUserById } = usersSlice.actions;
