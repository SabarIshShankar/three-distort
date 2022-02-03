import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Loader, Torus, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Badge } from "@pmdrs/branding";
import Environment from "@react-three/drei/Environment";
