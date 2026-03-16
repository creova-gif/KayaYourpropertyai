import { RouterProvider } from 'react-router';
import { router } from './routes';
import { InstantFeedback } from './components/InstantFeedback';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <InstantFeedback />
    </LanguageProvider>
  );
}