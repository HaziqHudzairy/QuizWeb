import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionPage from './pages/questionPages.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
