// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { QueryClient, QueryClientProvider } from 'react-query';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
