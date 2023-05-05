"use client";
import { Canvas} from '@react-three/fiber';
import Box from './game-objects/Box';


export const Background = () => {
  return <>
  <div className='absolute h-full w-full'>
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </Canvas>
    </div>
 </>
}
