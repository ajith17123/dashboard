import { useEffect } from "react";
import { Routes, Route, HashRouter } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'lenis/dist/lenis.css';
import './App.css';
import Home from './components/Home';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App () {
  useSmoothScroll();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;