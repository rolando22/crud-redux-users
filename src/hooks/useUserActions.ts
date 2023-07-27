import { User } from "../interfaces/User";
import { addNewUser, deleteUserById } from "../store/users/slice";
import type { UserId } from "../types/user";
import { useAppDispatch } from "./store";

export function useUserActions() {
    const dispatch = useAppDispatch();

    const addUser = ({ name, email, github }: User) => dispatch(addNewUser({ name, email, github }));
    const removeUser = (id: UserId) => dispatch(deleteUserById(id));

    return { addUser, removeUser };
}
