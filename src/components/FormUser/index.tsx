import { useState } from 'react';
import { 
    Badge,
    Button, 
    Card, 
    TextInput, 
    Title 
} from '@tremor/react';
import { useUserActions } from '../../hooks/useUserActions';
import type { UserId } from '../../types/user';
import { UserWithId } from '../../interfaces/User';

interface Props {
    id: UserId
    name: string
    email: string
    github: string
    loadUserEdit: (user: UserWithId) => void
}

export function FormUser({ id, name, email, github, loadUserEdit }: Props) {
    const { addUser, editUser } = useUserActions();
    const [validate, setValidate] = useState<'ok' | 'ko' | null>(null);

    const title = id === '' ? 'Crear Nuevo Usuario' : 'Editar Usuario';
    const buttonText = id === '' ? 'Crear' : 'Edit';

    const handlerOnSubmitAddUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidate(null);
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        if (!name || !email || !github) return setValidate('ko');
        id === '' ? addUser({ name, email, github }) : editUser({ id, name, email, github });
        setValidate('ok');
        loadUserEdit({ id: '', name: '', email: '', github: '' });
        // form.reset();
    };

    const handlerOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        loadUserEdit({ id, name: event.target.value, email, github });
    };
    const handlerOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        loadUserEdit({ id, name, email: event.target.value, github });
    };
    const handlerOnChangeGithub = (event: React.ChangeEvent<HTMLInputElement>) => {
        loadUserEdit({ id, name, email, github: event.target.value });
    };

    return (
        <Card className='grid gap-4 border-2 border-sky-500'>
            <Title>{title}</Title>
            <form 
                className='grid gap-4'
                onSubmit={handlerOnSubmitAddUser}
            >
                <TextInput 
                    type='text'
                    name='name'
                    value={name}
                    placeholder='Ingresar nombre'
                    onChange={handlerOnChangeName}
                />
                <TextInput 
                    type='text'
                    name='email'
                    value={email}
                    placeholder='Ingresar Email'
                    onChange={handlerOnChangeEmail}
                />
                <TextInput 
                    type='text'
                    name='github'
                    value={github}
                    placeholder='Ingresar GitHub'
                    onChange={handlerOnChangeGithub}
                />
                <div className='flex gap-2 items-center'>
                    <Button 
                        className='bg-sky-500 rounded-lg'
                        type='submit'
                    >
                        {buttonText}
                    </Button>
                    {validate === 'ko' && <Badge className='bg-red-400 rounded-md'>Error con los campos</Badge>}
                </div>
            </form>
        </Card>
    );
}
