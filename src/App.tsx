import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { About } from './views/About';
import ErrorPage from './views/Error';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
