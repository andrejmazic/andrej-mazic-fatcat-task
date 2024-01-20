import '@homework-task/styles.css';

import {Landing} from '@homework-task/components/landing/Landing';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import List from '@homework-task/components/List';
import MyForm from '@homework-task/components/MyForm';
import MyPage from '@homework-task/components/MyPage';

const queryClient = new QueryClient();

function App() {
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/list" element={<List />} />
                        <Route path="/form" element={<MyForm />} />
                        <Route path="/page" element={<MyPage />} />
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </main>
    );
}

export default App;
