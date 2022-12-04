import { createBrowserRouter } from 'react-router-dom';
import { Create } from './pages/Create';
import { Finish } from './pages/Finish';

import { Home } from './pages/Home';
import { Respond } from './pages/Respond';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/create',
        element: <Create />
    },
    {
        path: '/respond/:surveyCode',
        element: <Respond />
    },
    {
        path: '/finish/:surveyCode',
        element: <Finish />
    },
]);
