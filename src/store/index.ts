import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from './users/slice';
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const { type } = action;
    next(action);
    localStorage.setItem('users_redux', JSON.stringify(store.getState()));
    if (type === 'users/addNewUser' || type === 'users/updateUser') toast.success('Guardado correctamente');
};

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;
    const prevState = store.getState() as RootState;
    next(action);
    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload;
        const userToRemove = prevState.users.find(user => user.id === userIdToRemove);
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: 'DELETE'
		})
            .then(res => {
                if (res.ok)
                    toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
                else
                    throw new Error('Error al eliminar el usuario');
            })
            .catch(err => {
                toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
                if (userToRemove) store.dispatch(rollbackUser(userToRemove));
                console.log(err);
            });
    }
};

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: [
        persistanceLocalStorageMiddleware, 
        syncWithDatabaseMiddleware, 
    ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
