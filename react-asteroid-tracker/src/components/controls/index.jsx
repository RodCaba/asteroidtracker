import * as THREE from "three";
import CameraControls from "camera-controls"
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";

CameraControls.install({THREE});

export default function Controls({zoom, focus, pos = new THREE.Vector3(),
                                look = new THREE.Vector3()}){

    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    // eslint-disable-next-line
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
    return useFrame((state, delta) => {
        zoom ? pos.set(focus.x, focus.y, focus.z + 0.5): pos.set(0,0,5);
        zoom ? look.set(focus.x, focus.y, focus.z - 0.5): look.set(0,0,4);

        state.camera.position.lerp(pos, 0.5);
        state.camera.updateProjectionMatrix()

        controls.setLookAt(state.camera.position.x, state.camera.position.y,
                            state.camera.position.z, look.x, look.y, look.z, true);

        return controls.update(delta);
    })

}