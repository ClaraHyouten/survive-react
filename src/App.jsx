
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// pages
import { Menu } from './pages/Menu'
import { Game } from './pages/Game'
import { GameOver } from './pages/GameOver'
import { Page404 } from './pages/Page404'

function App() {
  const version = '0.0.1';

  console.log('[DEBUG] App rendered');

  return (
    <BrowserRouter basename="/survive-react/">
      <Routes>
        <Route path="/" element={<Menu version={version} />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )

};

export default App
