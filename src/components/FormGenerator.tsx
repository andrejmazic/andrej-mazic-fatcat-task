import clsx from 'clsx';
import {UseFormRegister, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useMutation} from '@tanstack/react-query';

type FormGeneratorProps = {
    title?: string;
    validationSchema: z.ZodObject<any>;
    formOnSubmit: (data: any) => Promise<any>;
    renderForm: (props: {
        register: UseFormRegister<any>;
        errors: Record<string, any>;
    }) => JSX.Element;
}

const FormGenerator = ({title, validationSchema, formOnSubmit, renderForm}: FormGeneratorProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(validationSchema)});

    const {mutateAsync, isError, isSuccess, data, status} = useMutation({
        mutationFn: formOnSubmit,
    });

    const onSubmit = (formData: any) => {
        try {
            mutateAsync(formData);
        } catch (error) {
            console.error('Error ', error);
        }
    }

    return (
        <div className='p-2 flex flex-col justify-center items-center w-full'>
            <h1 className={clsx(
                'text-2xl',
            )}>{title}</h1>
            <div className='w-1/4'>
                <form onSubmit={handleSubmit(onSubmit)} className={clsx('flex', 'flex-col', 'gap-3')}>
                {renderForm({register, errors})}
                    <input type='submit' disabled={status === 'pending'} value={status === 'pending' ? 'Submitting' : 'Submit'} className={clsx(
                        'bg-mainGreen',
                        'rounded-md',
                        'cursor-pointer',
                        'text-gray5',
                        'p-2'
                    )} />
                {isSuccess ? <p>Success</p> : null}
                {isError ? <p>Error submitting the form</p> : null}
                {data ? <pre>{JSON.stringify(data, undefined, 4)}</pre> : null}
            </form>
            </div>
        </div>
    )
}

export default FormGenerator;