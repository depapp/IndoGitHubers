import { Route, Routes } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { Layout } from './components/Layout'
import { localCache } from './lib/cache'
import { About } from './views/About'
import { Detail } from './views/Detail'
import ErrorPage from './views/Error'
import { Home } from './views/Home'

export default function App() {
  return (
    <SWRConfig
      value={{
        provider: localCache,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/u/:username" element={<Detail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </SWRConfig>
  )
}
