import {z} from 'zod';
import FormGenerator from './FormGenerator';
import clsx from 'clsx';

type FormDataTypes = {
    title: string;
    body: string;
}

const url = 'https://jsonplaceholder.typicode.com/posts';

const validationSchema = z.object({
    title: z.string().max(50, 'Title must contain at most 50 character(s)').min(1, 'Title is required'),
    body: z.string().max(150, 'Body must contain at most 150 character(s)').min(1, 'Body is required'),
})

const submitForm = async (data: FormDataTypes) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const MyForm = () => {
    return (
        <div className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'h-screen'
        )}>
            {/* TODO Try to make generic form field input https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/ */}
            <FormGenerator title='Add Post' validationSchema={validationSchema} formOnSubmit={submitForm} renderForm={({register, errors}) => (
                <>
                    <input {...register('title')} placeholder='Title' className={clsx(
                        'bg-gray5 p-2 rounded-md'
                    )} />
                    <p className={clsx(
                        'text-mainRed',
                        'text-xs',
                        'font-bold'

                    )}>{errors.title?.message}</p>
                    <textarea {...register('body')} placeholder='Body' className={clsx(
                        'bg-gray5 p-2 rounded-md'
                    )} />
                    <p className={clsx(
                        'text-mainRed',
                        'text-xs',
                        'font-bold'
                    )}>{errors.body?.message}</p>
                </>
            )} />
        </div>
    )
}

export default MyForm;