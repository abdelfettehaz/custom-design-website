import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Design } from './pages/Design';
import { Gallery } from './pages/Gallery';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { MyDesigns } from './pages/MyDesigns';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { ChatWidget } from './components/chatbot/ChatWidget';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<Design />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/my-designs" element={<MyDesigns />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
      <ChatWidget />
    </Router>
  );
}

export default App;