

import { Suspense, useRef, useState } from "react"
import { Html, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"

const Model = () => {
  const { scene } = useGLTF("assets/models/pokemon_basic_pokeball.glb")
  return <primitive object={scene} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
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

export default function Pokeball() {
  const [cameraRotation, setCameraRotation] = useState(0)
  const colors = ["bg-red-600", "bg-yellow-600", "bg-blue-600", "bg-green-600"]

  const segSize = (2 * Math.PI) / colors.length
  const normalizedRotation = (cameraRotation + 2 * Math.PI) % (2 * Math.PI)
  const currentSeg = Math.floor(normalizedRotation / segSize) % colors.length

  const currentColor = colors[currentSeg] || colors[0]

  return (
    <div className={`flex items-center justify-center h-screen w-full ${currentColor} text-white p-6
    max-sm:flex-col`}>

        <Canvas className="w-3/6 max-sm:w-full" shadows>
            <perspectiveCamera makeDefault position={[0, 0, 5]} />
            
            <CameraControls setCameraRotation={setCameraRotation} />

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 20]} intensity={1.5} />

            <Suspense fallback={
                <Html center>
                    Loading...
                </Html>
            }>
            <Model />
            </Suspense>
        </Canvas>

        <div className="w-3/6 max-sm:w-full">
            <h1 className="text-9xl max-sm:text-7xl">IT'S AL</h1>

            <p  className="text-2xl max-sm:text-xl">
                "Never play with anyone's heart; play with my Poké Ball instead."
            </p>
        </div>
    </div>
  )
}
