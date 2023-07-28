import { useState } from 'react';
import { 
    Badge,
    Button, 
    Card, 
    TextInput, 
    Title 
} from '@tremor/react';
import { useUserActions } from '../../hooks/useUserActions';

export function CreateUser() {
    const { addUser } = useUserActions();
    const [validate, setValidate] = useState<'ok' | 'ko' | null>(null);

    const handlerOnSubmitAddUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidate(null);
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        if (!name || !email || !github) return setValidate('ko');
        addUser({ name, email, github });
        setValidate('ok');
        form.reset();
    };

    return (
        <Card className='grid gap-4'>
            <Title>Crear Nuevo Usuario</Title>
            <form 
                className='grid gap-4'
                onSubmit={handlerOnSubmitAddUser}
            >
                 <TextInput 
                    type='text'
                    name='name'
                    placeholder='Ingresar nombre'
                 />
                 <TextInput 
                    type='text'
                    name='email'
                    placeholder='Ingresar Email'
                 />
                 <TextInput 
                    type='text'
                    name='github'
                    placeholder='Ingresar GitHub'
                 />
                 <div className='flex gap-2 items-center'>
                    <Button 
                        className='bg-sky-500 rounded-lg'
                        type='submit'
                    >
                        Crear
                    </Button>
                    <span>
                        {validate === 'ok' && <Badge className='bg-green-400 rounded-md'>Guardado correctamente</Badge>}
                        {validate === 'ko' && <Badge className='bg-red-400 rounded-md'>Error con los campos</Badge>}
                    </span>
                 </div>
            </form>
        </Card>
    );
}
