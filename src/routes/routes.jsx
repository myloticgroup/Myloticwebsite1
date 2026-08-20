import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Service from '../pages/services/Service';
import Training from '../pages/training/Training';
import Contact from '../pages/contact/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'why-choose-us', element: <About /> },
      { path: 'services', element: <Service /> },
      { path: 'services/ai-automation', element: <Service /> },
      { path: 'services/web-development', element: <Service /> },
      { path: 'services/staff-augmentation', element: <Service /> },
      { path: 'training', element: <Training /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export default router;