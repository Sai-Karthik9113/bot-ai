import React from 'react';
import './App.css';
import { Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import ConversationHistoryPage from './pages/PastConversations';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/past-conversations' element={<ConversationHistoryPage />} />
    </Routes>
  );
}

export default App;
