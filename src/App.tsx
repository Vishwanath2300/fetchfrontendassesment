import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './access/login'
import './App.css'
import  SearchPage from './searchBreed/searchPage'

function App() {
  

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
