import { User, UserWithId } from "../interfaces/User";
import { addNewUser, deleteUserById, updateUser } from "../store/users/slice";
import type { UserId } from "../types/user";
import { useAppDispatch } from "./store";

export function useUserActions() {
    const dispatch = useAppDispatch();

    const addUser = ({ name, email, github }: User) => dispatch(addNewUser({ name, email, github }));
    const editUser = ({ id, name, email, github }: UserWithId) => dispatch(updateUser({ id, name, email, github }));
    const removeUser = (id: UserId) => dispatch(deleteUserById(id));

    return { addUser, editUser, removeUser };
}
