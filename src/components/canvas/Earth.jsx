import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../ui/Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={3.0} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Function to handle responsive sizing
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;

        // Reset any inline styles that might be causing issues
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        // Force a redraw
        if (canvas.parentElement) {
          const width = canvas.parentElement.clientWidth;
          const height = canvas.parentElement.clientHeight;

          // Update renderer size if needed
          if (canvas.__r3f && canvas.__r3f.fiber) {
            const { gl } = canvas.__r3f.fiber;
            gl.setSize(width, height);
          }
        }
      }
    };

    // Initial sizing
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 5],
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <OrbitControls
          autoRotate
          rotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
