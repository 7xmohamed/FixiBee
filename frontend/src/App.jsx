import './App.css'
import {Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
  );
}

export default App;
