import { createSlice } from "@reduxjs/toolkit";

interface User {
    name: string
    email: string
    github: string
}

interface UserWithId extends User {
    id: string
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
    reducers: {},
});

export default usersSlice.reducer;
