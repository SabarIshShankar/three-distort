import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Loader, Torus, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Environment from "@react-three/drei/Environment";

import { DistortTorusMaterial } from "./DistortTorusMaterial";
import "./styles.css";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.useAgent);

function DistortedTorus() {
  const ref = useRef();
  const TORUS_RADIUS = 5;
  const { size, viewport } = useThree();
  const textures = useTexture([
    "/ao.jpg",
    "/normal.jpg",
    "height.jpg",
    "/roughness.jpg"
  ]);
  const [ao, normal, height, roughness] = textures;
  const [rEuler, rQuaternion] = useMemo(
    () => [new THREE.Euler(), new THREE.Quaternion()],
    []
  );

  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (texture.wrapT = texture.wrapS = THREE.RepeatWrapping)
    );
  }, [textures]);

  useFrame(({ mouse }) => {
    rEuler.set(
      (mouse.y * viewport.height) / 300,
      (mouse.x * viewport.width) / 300,
      0
    );
    ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1);
  });

  return (
    <>
      <Torus ref={ref} args={[TORUS_RADIUS, 1.5, 128, 516]}>
        <DistortTorusMaterial
          color="#a19266"
          metalness={1}
          roughness={0.8}
          radius={TORUS_RADIUS}
          resolution={[size.width, size.height]}
          aoMap={ao}
          normalMap={normal}
          normalScale={[2, 2]}
          displacementMap={height}
          roughnessMap={roughness}
        />
      </Torus>
    </>
  );
}

function App() {
  return (
    <>
      <Canvas
        pixelRatio={[1, 2]}
        camera={{
          position: [0, 0, 20],
          near: 0.1,
          far: 100,
          fov: 50
        }}
      >
        <spotLight intensity={2} position={[0, 30, 40]} />
        <spotLight intensity={2} position={[-50, 30, 40]} />
        <group position={[0, 0, isMobile ? -16 : 0]}>
          <Suspense fallback={null}>
            <Environment files="photo_studio_01_1k.hrd" />
            <DistortedTorus />
          </Suspense>
        </group>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
