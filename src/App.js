import React from 'react';
import './App.css';
import { Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import ConversationHistoryPage from './pages/PastConversations';
import { AppProvider } from './Context';

function App() {
  
  return (
    <AppProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/past-conversations' element={<ConversationHistoryPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
