import { CreateUser, ListOfUsers } from './components';

import './App.css';

export function App() {
    return (
        <main className='grid gap-4'>
            <ListOfUsers />
            <CreateUser />
        </main>
    );
}
