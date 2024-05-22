import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar';
import Statistics from './Pages/Statistics'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <div className="pages">
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/statistics" 
          element={<Statistics />} 
        />
      </Routes>
    </div>
  </BrowserRouter>
    </div>
  );
}

export default App;
