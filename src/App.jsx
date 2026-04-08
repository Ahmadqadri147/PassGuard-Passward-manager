import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <> <div className="h-screen w-screen flex flex-col overflow-hidden">

      <Navbar />

      <Manager />

      <Footer />

    </div>


    </>
  )
}

export default App
