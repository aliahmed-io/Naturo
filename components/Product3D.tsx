"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function Model(props: any) {
    const { scene } = useGLTF("/product.glb");
    return <primitive object={scene} {...props} />;
}

export default function Product3D() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    {/* Stage handles lighting and centering automatically */}
                    <Stage environment="city" intensity={0.6} adjustCamera>
                        <Float
                            speed={2}
                            rotationIntensity={1}
                            floatIntensity={1}
                        >
                            <Model />
                        </Float>
                    </Stage>

                    <ContactShadows opacity={0.5} scale={10} blur={1.5} far={0.8} color="#1B3022" />
                </Suspense>

                {/* Enable Interaction */}
                <OrbitControls makeDefault autoRotate autoRotateSpeed={1} />
            </Canvas>
        </div>
    );
}

// Preload the model
useGLTF.preload("/product.glb");
