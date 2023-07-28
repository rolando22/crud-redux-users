import { CreateUser, ListOfUsers } from './components';
import { Toaster } from 'sonner';

import './App.css';

export function App() {
    return (
        <main className='grid gap-4'>
            <ListOfUsers />
            <CreateUser />
            <Toaster richColors />
        </main>
    );
}
