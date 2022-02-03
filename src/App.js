import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Loader, Torus, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Badge } from "@pmdrs/branding";
import Environment from "@react-three/drei/Environment";

import { DistortTorusMaterial } from "./DistorsTorusMaterial";
import "./styles.css";
import Overlay from "./Overlay";

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
}
