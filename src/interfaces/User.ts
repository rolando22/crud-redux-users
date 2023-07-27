import { UserId } from "../types/user"

export interface User {
    name: string
    email: string
    github: string
}

export interface UserWithId extends User {
    id: UserId
}
