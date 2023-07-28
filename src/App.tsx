import { useState } from 'react';
import { FormUser, ListOfUsers } from './components';
import { UserWithId } from './interfaces/User';
import { Toaster } from 'sonner';

import './App.css';

export function App() {
    const [userEdit, setUserEdit] = useState<UserWithId>({
        id: '',
        name: '',
        email: '',
        github: '',
    });

    const loadUserEdit = (user: UserWithId) => setUserEdit(user);

    return (
        <main className='grid gap-4'>
            <ListOfUsers loadUserEdit={loadUserEdit}/>
            <FormUser 
                {...userEdit} 
                loadUserEdit={loadUserEdit}
            />
            <Toaster richColors />
        </main>
    );
}
