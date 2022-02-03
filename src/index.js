import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { useMemo, useEffect, useState, Suspense, useRef } from "react";
import { Canvas, createPortal, useFrame, useThree } from "react-three-fiber";
import {
  EffectComposer,
  EffectPass,
  SavePass,
  RenderPass,
  HalfFloatType,
  BlendFunction,
  NoiseEffect,
  BloomEffect
} from "postprocessing";
import "./styles.css";
import { Environment, Text, TorusKnot, OrbitControls } from "@react-three/drei";
import { DistortTorusMaterial } from "./customMaterial";
import { Color } from "three";

function SpinningThing() {
  return (
    <group scale={[0.15, 3.5, 1]}>
      <Text
        color="black"
        fontSize={1}
        font="https://db.onlinewebfonts.com/t/e45212fe434d8d24e4b834fd63e5b294.woff"
      >
        UNAPOLOGETIC MODERN ARCHITECTURE
      </Text>
    </group>
  );
}

function Cube() {
  const [targetCamera] = useState(new THREE.PerspectiveCamera());
  const [targetScene] = useState(new THREE.Scene());

  const { gl, scene, size, camera } = useThree();

  const [composer, savePass] = useMemo(() => {
    const composer = new EffectComposer(gl, { frameBufferType: HalfFloatType });
    const renderPass = new RenderPass(scene, camera);
    const targetRenderPass = new RenderPass(targetScene, targetCamera);
    const savePass = new SavePass(new THREE.WebGLRenderTarget(2048, 2048));

    const BLOOM = new BloomEffect({
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.1
    });
    const NOISE = new NoiseEffect({
      blendFunction: BlendFunction.COLOR_DODGE
    });
    NOISE.blendMode.opacity.value = 0.1;
    const effectPass = new EffectPass(camera, BLOOM);

    composer.addPass(targetRenderPass);
    composer.addPass(savePass);
    composer.addPass(renderPass);
    composer.addPass(effectPass);
    return [composer, savePass];
  }, [camera, gl, scene, targetCamera, targetScene]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
    targetScene.background = new Color("white");
    targetCamera.position.z = 5;
  }, [composer, size, targetScene, targetCamera]);
  useFrame((_, delta) => void composer.render(delta), 1);

  return (
    <group>
      {createPortal(<SpinningThing />, targetScene)}
      <TorusKnot args={[20, 5, 190, 4, 5, 3]}>
        <DistortTorusMaterial
          clearcoat={1}
          roughness={0}
          metalness={1}
          color="white"
          myTexture={savePass.texture}
          speed={0.2}
        />
      </TorusKnot>
    </group>
  );
}

ReactDOM.render(
  <Canvas
    concurrent
    colorManagement
    gl={{ powerPreference: "high-performance" }}
    camera={{ position: [0, 0, 65], near: 0.1, far: 100 }}
  >
    <color attach="background" args={["white"]} />

    <Cube />
    <OrbitControls
      enablePan={false}
      minPolarAngle={Math.PI / 16}
      maxPolarAngle={Math.PI / 2}
    />
    <Suspense fallback={null}>
      <Environment files="rooftop_night_1k.hdr" />
    </Suspense>
  </Canvas>,
  document.getElementById("root")
);
