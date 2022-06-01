import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Film from "./pages/Film";
import HttpErroror from "./pages/HttpError";
import Favoritos from "./pages/Favorites";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Film />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="*" element={<HttpErroror />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
