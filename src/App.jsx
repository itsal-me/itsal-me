
import { useState } from "react";
import Pokeball from "./components/Pages/Landing/Poekball";
import Landing from "./components/Pages/Landing/Landing";


function App() {

  const [start, setStart] = useState(false)

  const handleStart = () => {
    setStart(true)
  }

  return (
    <div className="font-indie h-screen w-full">
        {!start && <Landing onStart={handleStart} />}
        {start && <Pokeball />}
    </div>
  );
}

export default App
