
import { useState } from "react";
import Pokeball from "./components/Pages/Landing/Poekball";
import Landing from "./components/Pages/Landing/Landing";
import Me from "./components/Pages/Me/Me";
import Work from "./components/Pages/Work/Work";
import Contact from "./components/Pages/Contact/Contact";
import Article from "./components/Pages/Article/Article";


function App() {

  const [start, setStart] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [secId, setSecId] = useState()
  


  const handleStart = () => {
    setStart(true)
  }

  const handleClick = (id) => {
    setSecId(id)
    setClicked(true)
  }

  return (
    <div className="font-indie h-screen w-full">
        {!start && <Landing onStart={handleStart} />}
        {start && <Pokeball onClick={handleClick}/>}
        {clicked && secId === '1' && <Me />}
        {clicked && secId === '2' && <Work />}
        {clicked && secId === '3' && <Article />}
        {clicked && secId === '4' && <Contact />}
    </div>
  );
}

export default App
