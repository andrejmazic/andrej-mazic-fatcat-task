import clsx from 'clsx';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

const UserCard = ({id, name, username, email, phone}: User) => {
    return (
        <div>
            <div className={clsx(
                'bg-gray20',
                'rounded-md',
                'p-2'
            )}>
                <h3>ID: {id}</h3>
                <p>Name: {name}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
            </div>
        </div>
    )
}

export default UserCard;