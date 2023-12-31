import { EditIcon, RemoveIcon } from '..';

import { useAppSelector } from '../../hooks/store';
import { useUserActions } from '../../hooks/useUserActions';
import { UserWithId } from '../../interfaces/User';

import type { UserId } from '../../types/user';

import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title
} from '@tremor/react';

interface Props {
    loadUserEdit: (user: UserWithId) => void
}

export function ListOfUsers ({ loadUserEdit }: Props) {
    const users = useAppSelector(state => state.users);
    const { removeUser } = useUserActions();

    const handlerOnClickLoadUserEdit = (user: UserWithId) => () => loadUserEdit(user);
    const handlerOnClickRemoveUser = (id: UserId) => () => removeUser(id);
  
    return (
      <Card className='border-2 border-sky-500'>
        <Title className='flex gap-2'>
            Usuarios
            <Badge className='rounded-full bg-sky-200 text-sky-600 font-bold'>{users.length}</Badge>
        </Title>
        <Table>
            <TableHead>
                <TableRow>
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(user => 
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className='flex items-center gap-2'>
                            <img 
                                className='w-8 h-8 rounded-full'
                                src={`https://unavatar.io/github/${user.github}`} 
                                alt={user.name} 
                            />
                            {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <button onClick={handlerOnClickLoadUserEdit(user)}><EditIcon /></button>
                            <button onClick={handlerOnClickRemoveUser(user.id)}><RemoveIcon /></button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </Card>
    );
}
