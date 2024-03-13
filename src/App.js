import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AllDogs from './pages/AllDogs'
import AddDogs from './pages/AddDog'
import EditDogs from './pages/EditDog'
import Walkers from './pages/Walkers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/showAll'
              element={<AllDogs />}
            />
            <Route
              path='/addDog'
              element={<AddDogs />}
            />
            <Route
              path='editDog/:dogId'
              element={<EditDogs />}
            />

            <Route
              path='/walkers'
              element={<Walkers />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
