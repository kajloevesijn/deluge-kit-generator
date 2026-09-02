"use client";
import { Canvas } from '@react-three/fiber';
import Box from './game-objects/Box';

export const BackgroundCanvas = () => {
  return <>
  <div className='absolute h-full w-full'>
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} intensity={300} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </Canvas>
    </div>
 </>
}
