import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ShowTareas from './components/Tareas';
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<ShowTareas />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
