

import { Suspense, useRef, useState, useEffect} from "react"
import { Html, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Navbar from "../../Navigation/Navbar"


const Model = ({ scale }) => {


  const { scene } = useGLTF("assets/models/pokemon_basic_pokeball.glb")

  const modelRef = useRef()

  useEffect(() => {
    if (modelRef.current){
      gsap.to(modelRef.current.position, {
        y: 0.5,
        duration: 1.5,
        repeat: -1,
        ease: 'power1.inOut',
        yoyo: true
        
      })
    }
  }, [])
 
  return <primitive ref={modelRef} object={scene} position={[0, 0, 0]} scale={scale} />
}

const CameraControls = ({ setCameraRotation }) => {
  const orbitControlsRef = useRef()

  useFrame(() => {
    if (orbitControlsRef.current) {
        const azimuthAngle = orbitControlsRef.current.getAzimuthalAngle()
        setCameraRotation(azimuthAngle)

    }
  })

  return <OrbitControls ref={orbitControlsRef} enableZoom={false} enableRotate={true} rotateSpeed={1} />
}


export default function Pokeball({ onClick }) {
  const [cameraRotation, setCameraRotation] = useState(0)
  const colors = ["bg-red-600", "bg-yellow-600", "bg-blue-600", "bg-green-600"]
  
  const secDb = [
    {
      id: "1",
      title: "IT'S AL",
      content: `"Never play with anyone's heart; play with my Poké Ball instead."`,
      cta: "Learn more about me"
    },

    {
      id: "2",
      title: "Crafting Unique",
      content: "From concept to creation, I design and develop interactive, user-friendly websites that make an impact.",
      cta: "Explore my work"
    },

    {
      id: "3",
      title: "Thoughts & Insights",
      content: "Delving into Design, Development, and Innovation.",
      cta: "Read my articles"
    },

    {
      id: "4",
      title: "Let’s Connect",
      content: "Got a project in mind or just want to say hi? I'd love to hear from you.",
      cta: "Let's build something amazing together"
    },

  ]





  const [scale, setScale] = useState([0.4, 0.4, 0.4])

  const segSize = (2 * Math.PI) / colors.length
  const normalizedRotation = (cameraRotation + 2 * Math.PI) % (2 * Math.PI)
  const currentSeg = Math.floor(normalizedRotation / segSize) % colors.length

  const currentColor = colors[currentSeg] || colors[0]
  const currentSecData = secDb[currentSeg] || secDb[0]

  console.log(cameraRotation)



  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScale([0.3, 0.3, 0.3])
      } 
      
      else if (width < 1200) {
        setScale([0.4, 0.4, 0.4])
      } 
      
      else {
        setScale([0.4, 0.4, 0.4])
      }
    }
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative  h-screen w-full">
      <div className={`flex gap-4 items-center justify-center h-full ${currentColor} text-white p-6
      max-sm:flex-col`}>
          <div className="w-3/6 h-screen max-sm:w-full max-sm:h-3/6">
            <Canvas shadows>

                <perspectiveCamera makeDefault position={[0, 0, 5]} />
                <CameraControls setCameraRotation={setCameraRotation} />

                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 20]} intensity={1.5} />

                <Suspense fallback={
                    <Html center>
                        Loading...
                    </Html>
                }>
                <Model 
                scale={scale} 
                />
                </Suspense>

            </Canvas>
          </div>

          <div className="w-3/6 flex flex-col gap-2 max-sm:w-full select-none max-sm:h-3/6">
              <h1 className="text-9xl max-sm:text-7xl">{currentSecData.title}</h1>
              <p  className="text-2xl max-sm:text-xl text-justify">
                  {currentSecData.content}
              </p>
              <a href={`#${currentSecData.id}`}><button onClick={() => onClick(currentSecData.id)} className="bg-white text-black hover:scale-95 transition-all duration-300 ease-in-out px-5 py-3">{currentSecData.cta}</button></a>
          </div>
      </div>

    </div>
  )
}
