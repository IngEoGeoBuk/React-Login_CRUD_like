import { createContext } from 'react';

interface Types {
    name: string | null;
    email: string | null;
}

const UserInfoContext = createContext<Types>({
    name: '',
    email: '',
})

export default UserInfoContext;