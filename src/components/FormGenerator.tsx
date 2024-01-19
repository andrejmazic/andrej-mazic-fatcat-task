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

const FormGenerator = ({title = 'Custom Form', validationSchema, formOnSubmit, renderForm}: FormGeneratorProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(validationSchema)});

    const {mutateAsync, isError, isPending, isSuccess, data} = useMutation({
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
        <div className={clsx('max-w-md')}>
            <h1>{title}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={clsx('flex', 'flex-col')}>
                {renderForm({register, errors})}
                <input type='submit' disabled={isPending} title={isPending ? 'Submitting' : 'Submit'} />
                {isSuccess ? <p>Success</p> : null}
                {isError ? <p>Error submitting the form</p> : null}
                {data ? <pre>{JSON.stringify(data, undefined, 4)}</pre> : null}
            </form>
        </div>
    )
}

export default FormGenerator;