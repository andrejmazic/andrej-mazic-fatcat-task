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
            'justify-center',
            'items-center',
            'p-8',
            'sm:p-16'
        )}>
            <div>
                {/* TODO Make loading cool */}
                {loading && <h3>Loading...</h3>}
                {/* TODO Make empty state for list */}
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