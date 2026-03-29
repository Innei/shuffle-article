import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { App } from './App'
import { Playground } from './Playground'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="playground" element={<Playground />} />
    </Routes>
  </BrowserRouter>,
)
