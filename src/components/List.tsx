import clsx from 'clsx';

import {useEffect, useState} from 'react';
import UserCard, {User} from './UserCard';

const List = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<{message: string} | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error occured: ', error);
                setError(error)
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className={clsx(
            'bg-cream',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'gap-5',
            'p-5',
        )}>
            <h1 className={clsx(
                'text-2xl',
                'font-bold'
            )}>User list</h1>
            <div>
                {loading && <h3>Loading...</h3>}
                {error ? (
                    <p>Something went wrong: {error.message}</p>
                ) : (
                    <ul className={clsx(
                        'flex',
                        'flex-col',
                        'gap-2'
                    )}>
                        {users.map((item: User) => (
                            <li key={item.id}>
                                <UserCard {...item} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default List;