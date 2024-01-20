import {z} from 'zod';
import FormGenerator from './FormGenerator';
import clsx from 'clsx';

type FormDataTypes = {
    subject: string;
    message: string;
}

const validationSchema = z.object({
    subject: z.string().max(50).min(1, 'Subject is required'),
    message: z.string().max(150).min(1, 'Message is required'),
})

const submitForm = async (data: FormDataTypes) => {
    alert(`Title: ${data.subject}\nMessage: ${data.message}`);
}

const ContactUsForm = () => {
    return (
        <div>
            {/* TODO Try to make generic form field input https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/ */}
            <FormGenerator validationSchema={validationSchema} formOnSubmit={submitForm} renderForm={({register, errors}) => (
                <>
                    <input {...register('subject')} placeholder='Subject' className={clsx(
                        'bg-white p-2 rounded-md'
                    )} />
                    <p className={clsx(
                        'text-mainRed',
                        'text-xs',
                        'font-bold'

                    )}>{errors.subject?.message}</p>
                    <textarea {...register('message')} placeholder='Message' className={clsx(
                        'bg-white p-2 rounded-md'
                    )} />
                    <p className={clsx(
                        'text-mainRed',
                        'text-xs',
                        'font-bold'

                    )}>{errors.message?.message}</p>
                </>
            )} />
        </div>
    )
}

export default ContactUsForm;