import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LoaderSpinner = () => (
  <div className="flex justify-center items-center h-full w-full">
    <div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin" />
  </div>
);

function Car() {
  const bike = useGLTF("/carModel/scene.gltf");
  const modelRef = useRef();

  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={modelRef} position={[0, -0.8, 0]}>
      <primitive
        object={bike.scene}
        scale={window.innerWidth < 768 ? 0.7 : 0.8} // Responsive scaling
      />
    </group>
  );
}

const CarModel = () => {
  return (
    <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center mx-auto">
      <div className="w-full h-full max-w-3xl md:max-w-4xl px-4">
        <Suspense fallback={<LoaderSpinner />}>
          <Canvas
            camera={{
              position: [
                0,
                window.innerWidth < 768 ? 1 : 1.5,
                window.innerWidth < 768 ? 4 : 5,
              ],
              fov: window.innerWidth < 768 ? 55 : 45,
            }}
            style={{ width: "100%", height: "100%" }}
            className="rounded-lg cursor-pointer"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, 3, 2]} intensity={0.6} />
            <Car />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default CarModel;
