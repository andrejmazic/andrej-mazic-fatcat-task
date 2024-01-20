## Task Implementations
1. [Transfer the project to TypeScript](#transfer-to-typescript-implementation)
2. [List component](#list-component-implementation)
3. [Form Generator component](#form-generator-component-implementation)
4. [Page Generator component](#page-generator-component-implementation)

## Complete the following tasks

### Transfer the project to TypeScript

Your first task involves transitioning this project 
from JavaScript to TypeScript. To ensure a robust 
and type-safe codebase, please configure TypeScript
with the following compiler options:
* "noImplicitAny": true
* "strict": true
* "strictNullChecks": true
* "noImplicitThis": true

Additionally, implement import aliases in your project
configuration. Set up your imports to use the format
***@homework-task/path/to/file.ts***.

In the ***src/components*** folder, you will find several
components. Your goal is to enhance these components with
appropriate TypeScript interfaces and types.

#### Transfer to TypeScript implementation:
The initial step in migrating to TypeScript necessitated the addition of the **typescript** dependency to the [package.json](./package.json) file, along with the incorporation of the corresponding [tsconfig.json](./tsconfig.json) file.

All **.jsx** and **.js** files were transformed into **.ts** and **.tsx** extensions, respectively. Simultaneously, the creation of prop types for components was undertaken.

Concerning import aliases, modifications were made to the [vite.config.ts](./vite.config.ts) file. A new property, **alias**, was introduced within the **resolve** property, pointing to **./src/** and named as **@homework-task**. Additionally, the [tsconfig.json](./tsconfig.json) file saw the inclusion of **baseUrl** and **paths**.

This process ensured a seamless transition to TypeScript while maintaining the integrity of the project structure.

### Create a List Component

Develop a React component that is both scalable and reusable,
designed to fetch and display data from an API in a list
format. The specific API endpoint to be used is
https://jsonplaceholder.typicode.com/users. For each item 
in the list, ensure that the following keys are displayed:
***id***, ***name***, ***email***, ***dateOfBirth***, and ***phone***.

#### List Component implementation:
Files:
* [List.tsx](./src/components/List.tsx)
* [UserCard.tsx](./src/components/UserCard.tsx)

**List.tsx** component uses the **useEffect** hook to fetch data from the https://jsonplaceholder.typicode.com/users endpoint when the component mounts. The fetched data is stored in a state variable **users**.

For each user in the users array, the component displays a **UserCard** component. The **UserCard** component is a separate, reusable component that receives a user object as a prop and displays the user's **id**, **name**, **username**, **email**, and **phone**.

If there's an error during the fetch operation, the error message is stored in a state variable error and displayed to the user. Additionally, a loading state is implemented to signal an ongoing data request process, especially if it takes some time.

### Create a Form Generator Component

1. Develop a scalable and reusable React component with the
following capabilities:

* **Validation Schema:** Accept a validation schema prop to ensure form data adheres to specified rules.
* **API Hook Call:** Incorporate an API hook that handles states such as data, isLoading, and isError.
* **Callback Function for Form Rendering:** Implement a callback function prop (renderForm) that renders the form elements and handles their state appropriately.

2. Component Implementation:
* Utilize this component to create a form with two fields:
  * Input Field (‘title’): A required field with a maximum character limit.
  * Textarea Field (‘body’): Also a required field with a maximum character limit.
* Both fields should display error messages if the input doesn't meet the criteria set by the validation schema.
* For form submissions, use the POST method at https://jsonplaceholder.typicode.com/posts.

Recommended libraries, but you can use whatever you prefer:
* ***React Query:*** For handling API calls.
* ***Zod:*** For defining the validation schema.
* ***React Hook Form:*** For managing form state, submission, and logic.

Alternatively, you're free to use any library or custom solution that aligns with the above requirements.

Component Example **(this does not have to be the exact implementation)**:

```tsx
<CreateForm<ICreateCycleFormInputs>
    useMutation={useSomeMutation}
    validationSchema={someSchema}
    successMessage="Successfully created something"
    renderForm={({ register, errors }) => (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
                {...register('name')}
            />
        </>
    )}
/>
```

#### Form Generator Component Implementation:
Files:
* [FormGenerator.tsx](./src/components/FormGenerator.tsx)
* [MyForm.tsx](./src/components/MyForm.tsx)

Libraries:
1. [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query) for API calls
2. [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) as form validation resolver
3. [zod](https://www.npmjs.com/package/zod) for validation schemas
4. [react-hook-form](https://www.npmjs.com/package/react-hook-form) for forms

This solution leverages the capabilities of React Query, Zod, React Hook Form and React Hook Form Resolvers for efficient state management, form validation, and API interactions.

**FormGenerator.tsx** component incorporates the capabilities outlined in the task description as following:

***Validation Schema:***

    The component accepts a validationSchema prop using the Zod library to define the validation rules for form data.

***API Hook Call:***

    The component uses the React Query library's useMutation hook to handle API calls and the states.

***Callback Function for Form Rendering:***

    The FormGenerator component accepts a renderForm callback function as a prop. This function is responsible for rendering the form elements using the provided register function for input bindings and errors for displaying validation errors.

[MyForm.tsx](./src/components/MyForm.tsx) component utilizes the FormGenerator component, it creates a form with two fields: a required title field with a maximum character limit and a required body field with a maximum character limit.

Validation errors are displayed for both fields if the input doesn't meet the criteria set by the validation schema.


### Create a Page Generator Component
Your task is to create a reusable React component for
building web pages. This component should be designed 
to handle a variety of page layouts and components 
dynamically, based on the props it receives.
* ***Dynamic Layout Handling:*** The component must handle different page layouts.
* ***Scalability and Reusability:*** It should be easily scalable to accommodate future layout types and be reusable across different pages.
* ***Prop Structure:*** The main prop is an array of objects, each representing a section of the page with its own layout and components.
  * Each object in this array contains:
    * type: identifying the layout type.
    * components: an array of objects, each describing a component to be rendered in this section.
    * props: properties specific to that layout (ex. background color)
  * Each component object has:
    * type: the type of the component (e.g., 'componentHero').
    * props: properties specific to that component.

You can use the components provided in src/components. If you desire, you can 
add your own components or change the existing ones.

Here is an example of the props that the component should accept:

```ts
const data = [
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentHero',
                props: {...componentProps},
            },
        ],
    },
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentItemsShowcase',
                props: {...componentProps},
            },
            {
                type: 'componentTrustBar',
                props: {...componentProps},
            },
        ],
    },
];

```

#### Page Generator Component Implementation:

Files:
* [PageGenerator.tsx](./src/components/PageGenerator.tsx)
* [MyPage.tsx](./src/components/MyPage.tsx)

[PageGenerator.tsx](./src/components/PageGenerator.tsx) component is designed to dynamically generate web pages based on the input data it receives through props.

The component dynamically renders sections and components.
It uses a combination of **map** functions and **switch** statements to render components based on their types.
The provided component types include '***Hero***', '***ItemsShowcase***', '***PanelShowcase***', '***TrustBar***', and '***ContactUsForm***'. You can add more layout types, component types, or even create your own components without modifying the core structure of the **PageGenerator** component.

Overall, this **PageGenerator** component provides a flexible and reusable solution for generating web pages with different layouts and components dynamically.

[MyPage.tsx](./src/components/MyPage.tsx) utilizes PageGenerator component to create a page based on the data prop, I used already created components:
1. [Hero.tsx](./src/components/Hero.tsx)
2. [ItemsShowcase.tsx](./src/components/ItemsShowcase.tsx)
3. [PanelShowcase.tsx](./src/components/PanelShowcase.tsx)
4. [TrustBar.tsx](./src/components/TrustBar.tsx)

In addition, a new component [ContactUsForm.tsx](./src/components/ContactUsForm.tsx) has been created using [FormGenerator.tsx](./src/components/FormGenerator.tsx) just to make the page looks cool. 🤘

### Additional Requirements
You will have to complete all of these for your task to be considered done.

* Follow the eslint and prettier rules set by the project; you must not use any ts-ignore or disable eslint.
* It must contain a Readme.md file that has instructions on how to run the project as well as a brief explanation of how you have implemented these features. In the project, there is already a Readme.md file present feel free to override it completely.
* Your code must follow the latest rules and conventions
* You have to have checks for typescript and eslint that disallow you to commit any changes that cause errors.
* There should be no TypeScript or Eslint errors in your code.
* Feel free to add your own touch to these tasks
* Keep in mind that you will have to expand upon this solution in the technical interview


### Note: You can override this document
