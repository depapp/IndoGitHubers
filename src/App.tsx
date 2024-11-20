import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './views/About';
import { Detail } from './views/Detail';
import ErrorPage from './views/Error';
import { Home } from './views/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/u/:username" element={<Detail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
