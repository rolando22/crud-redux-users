import { EditIcon, RemoveIcon } from '..';

import { useAppSelector } from '../../hooks/store';

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


export function ListOfUsers () {
    const users = useAppSelector(state => state.users);
  
    return (
      <Card>
        <Title className='flex gap-2'>
            Usuarios
            <Badge className='rounded-full bg-sky-500'>{users.length}</Badge>
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
                            <button><EditIcon /></button>
                            <button><RemoveIcon /></button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </Card>
    );
}
