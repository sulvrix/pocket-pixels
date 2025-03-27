import Navbar from "./Navbar"
import Footer from "./Footer"
import Bar from "./Bar"
import Hero from "./Hero"
import Home from "./Home"

function App() {

  return (
    <div className="App">
      <div className="content bg-gray-300">
        <Bar />
        <Hero />
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  )
}

export default App
