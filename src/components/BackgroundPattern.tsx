import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface WaveGridProps {
  mouse: { x: number; y: number };
}

// const WaveGrid: React.FC<WaveGridProps> = ({ mouse }) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const materialRef = useRef<THREE.ShaderMaterial>(null);

//   const uniforms = useMemo(
//     () => ({
//       uTime: { value: 0 },
//       uMouse: { value: new THREE.Vector2(0, 0) },
//       uResolution: {
//         value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//       },
//       uColor1: { value: new THREE.Color("#FF4D8D") }, // neon pink
//       uColor2: { value: new THREE.Color("#29F19C") }, // mint green
//       uColor3: { value: new THREE.Color("#FFD93D") }, // warm yellow
//     }),
//     []
//   );

// const vertexShader = `
//   uniform float uTime;
//   uniform vec2 uMouse;
//   varying vec2 vUv;
//   varying vec3 vPosition;

//   void main() {
//     vUv = uv;

//     vec3 pos = position;

//     // Create wave effect
//     float wave1 = sin(pos.x * 0.02 + uTime * 0.001) * 0.5;
//     float wave2 = sin(pos.y * 0.02 + uTime * 0.0015) * 0.3;
//     float wave3 = sin((pos.x + pos.y) * 0.015 + uTime * 0.002) * 0.4;

//     pos.z += wave1 + wave2 + wave3;

//     // Mouse interaction
//     float mouseDistance = distance(vec2(pos.x, pos.y), uMouse * 100.0);
//     pos.z += sin(mouseDistance * 0.02 - uTime * 0.003) * 0.8;

//     vPosition = pos;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform float uTime;
//   uniform vec2 uResolution;
//   uniform vec3 uColor1;
//   uniform vec3 uColor2;
//   uniform vec3 uColor3;
//   varying vec2 vUv;
//   varying vec3 vPosition;

//   void main() {
//     vec2 st = gl_FragCoord.xy / uResolution.xy;

//     // Create grid pattern
//     vec2 grid = abs(fract(vUv * 20.0) - 0.5);
//     float line = smoothstep(0.0, 0.02, min(grid.x, grid.y));

//     // Create hexagonal pattern
//     vec2 hex = abs(fract(vUv * 15.0 + sin(uTime * 0.0005) * 0.1) - 0.5);
//     float hexLine = smoothstep(0.0, 0.03, length(hex));

//     // Combine patterns
//     float pattern = max(line, hexLine * 0.7);

//     // Color mixing based on position and time
//     vec3 color1 = mix(uColor1, uColor2, sin(vPosition.x * 0.01 + uTime * 0.001) * 0.5 + 0.5);
//     vec3 color2 = mix(uColor2, uColor3, sin(vPosition.y * 0.01 + uTime * 0.0015) * 0.5 + 0.5);
//     vec3 finalColor = mix(color1, color2, sin((vPosition.x + vPosition.y) * 0.005 + uTime * 0.002) * 0.5 + 0.5);

//     // Add glow effect
//     float glow = 1.0 - smoothstep(0.0, 1.0, pattern);
//     finalColor *= glow * 0.8 + 0.2;

//     // Pulse effect
//     float pulse = sin(uTime * 0.003) * 0.1 + 0.9;
//     finalColor *= pulse;

//     gl_FragColor = vec4(finalColor, pattern * 0.3 + 0.1);
//   }
// `;

// useFrame((state) => {
//   if (materialRef.current) {
//     materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 1000;
//     materialRef.current.uniforms.uMouse.value.set(
//       mouse.x * 2 - 1,
//       -(mouse.y * 2 - 1)
//     );
//   }
// });

//   return (
//     <mesh ref={meshRef} position={[0, 0, -5]}>
//       <planeGeometry args={[200, 120, 100, 60]} />
//       <shaderMaterial
//         ref={materialRef}
//         uniforms={uniforms}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         transparent
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// };

const BackgroundPattern: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #18181b 0%, #23272f 100%)", // dark gradient
      overflow: "hidden",
    }}
  >
    <motion.div
      style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "rgba(255,77,141,0.5)", // neon pink
        boxShadow: "0 0 60px 20px #FF4D8D",
        filter: "blur(30px)",
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      }}
    />
    <motion.div
      style={{
        position: "absolute",
        bottom: "15%",
        right: "15%",
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "rgba(41,241,156,0.4)", // neon green
        boxShadow: "0 0 50px 15px #29F19C",
        filter: "blur(20px)",
      }}
      animate={{
        x: [0, -80, 0],
        y: [0, -40, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 7,
        ease: "easeInOut",
      }}
    />
    <motion.div
      style={{
        position: "absolute",
        top: "60%",
        left: "50%",
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "rgba(255,217,61,0.3)", // neon yellow
        boxShadow: "0 0 40px 10px #FFD93D",
        filter: "blur(15px)",
      }}
      animate={{
        x: [0, 60, 0],
        y: [0, 30, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

export default BackgroundPattern;
