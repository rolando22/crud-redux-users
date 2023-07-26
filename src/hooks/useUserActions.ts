import { deleteUserById } from "../store/users/slice";
import type { UserId } from "../types/user";
import { useAppDispatch } from "./store";

export function useUserActions() {
    const dispatch = useAppDispatch();

    const removeUser = (id: UserId) => dispatch(deleteUserById(id));

    return { removeUser };
}
