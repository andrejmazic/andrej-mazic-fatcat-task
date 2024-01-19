import {z} from 'zod';
import FormGenerator from './FormGenerator';

type FormDataTypes = {
    title: string;
    body: string;
}

const url = 'https://jsonplaceholder.typicode.com/posts';

const validationSchema = z.object({
    title: z.string().max(50).min(1, 'Title is required'),
    body: z.string().max(150).min(1, 'Body is required'),
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
        <div>
            {/* TODO Try to make generic form field input https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/ */}
            <FormGenerator title='Add Post' validationSchema={validationSchema} formOnSubmit={submitForm} renderForm={({register, errors}) => (
                <>
                    <input {...register('title')} placeholder='Title' />
                    <p>{errors.title?.message}</p>
                    <textarea {...register('body')} placeholder='Body' />
                    <p>{errors.body?.message}</p>
                </>
            )} />
        </div>
    )
}

export default MyForm;