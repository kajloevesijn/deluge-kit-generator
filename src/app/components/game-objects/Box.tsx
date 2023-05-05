import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import {useFrame, ThreeElements } from '@react-three/fiber'

export default function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}>
      <sphereGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={'white'} />
    </mesh>
  )
}