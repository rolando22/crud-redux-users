import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { UserId } from "../../types/user";
import { User, UserWithId } from "../../interfaces/User";

const DEFAULT_STATE = [
    {
        id: crypto.randomUUID(),
        name: 'Yazman Rodríguez',
        email: 'yazmanito@gmail.com',
        github: 'yazmanito',
    },
    {
        id: crypto.randomUUID(),
        name: 'John Doe',
        email: 'leo@gmail.com',
        github: 'leo',
    },
    {
        id: crypto.randomUUID(),
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
            state.push({ id, ...action.payload });
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id);
        },
        updateUser: (state, action: PayloadAction<UserWithId>) => {
            const index = state.findIndex(user => user.id === action.payload.id);
            state[index] = action.payload;
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
            if (!isUserAlreadyDefined) state.push({ ...action.payload });
        },
    },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById, updateUser, rollbackUser } = usersSlice.actions;
