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
                'font-bold'
            )}>{title}</h1>
            <div className='w-1/4'>
                <form onSubmit={handleSubmit(onSubmit)} className={clsx('flex', 'flex-col', 'gap-1')}>
                {renderForm({register, errors})}
                    <input type='submit' disabled={status === 'pending'} value={status === 'pending' ? 'Submitting' : 'Submit'} className={clsx(
                        'bg-mainGreen',
                        'rounded-md',
                        'cursor-pointer',
                        'text-gray5',
                        'p-2'
                    )} />
                    {isSuccess ? (
                        <div key={title} className="flex flex-col gap-2 items-center">
                            <img
                                src="/media/cool-checkmark.svg"
                                width={50}
                                alt="Checkmark"
                            />
                        </div>
                    ) : null}
                    {isError ? <p>Error submitting the form</p> : null}
                    {data ? (
                        <div>
                            <h2>Server response:</h2>
                            <pre className={clsx(
                                'bg-white',
                                'p-4',
                                'rounded-md'
                            )}>{JSON.stringify(data, undefined, 4)}</pre>
                        </div>
                    ) : null}
            </form>
            </div>
        </div>
    )
}

export default FormGenerator;