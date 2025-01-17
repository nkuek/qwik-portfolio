import {
  component$,
  useContext,
  useOnWindow,
  useSignal,
  useVisibleTask$,
  $,
  noSerialize,
  type NoSerialize,
  useStore,
} from "@builder.io/qwik";
import { css } from "@styles/css";
import { ThemeContext } from "~/root";
import * as THREE from "three";
import fragmentShader from "../shaders/particles/fragment.glsl";
import vertexShader from "../shaders/particles/vertex.glsl";
import GUI from "lil-gui";
import { useLocation } from "@builder.io/qwik-city";

function generateParticles(numParticles = 1000) {
  const speed = new Float32Array(numParticles);
  const position = new Float32Array(numParticles * 3);
  const size = new Float32Array(numParticles);

  for (let i = 0; i < numParticles; i++) {
    speed[i] = Math.random() * 0.3 - 0.15;
    position[i * 3] = 10 * (Math.random() * 2 - 1);
    position[i * 3 + 1] = 10 * (Math.random() * 2 - 1);
    position[i * 3 + 2] = 10 * (Math.random() * 2 - 1);
    size[i] = Math.random() + 0.3;
  }

  return { speed, position, size };
}

type StoreState = {
  renderer?: NoSerialize<THREE.WebGLRenderer>;
  camera?: NoSerialize<THREE.PerspectiveCamera>;
  scene?: NoSerialize<THREE.Scene>;
  points?: NoSerialize<THREE.Points>;
};

const ParticlesAnimation = component$(() => {
  const { url } = useLocation();
  const canvasSignal = useSignal<HTMLCanvasElement | undefined>();
  const store = useStore<StoreState>({
    renderer: undefined,
    camera: undefined,
    scene: undefined,
    points: undefined,
  });

  const theme = useContext(ThemeContext);
  const tweaks = useStore({
    numParticles: 3000,
    color: "white",
  });

  const handleResize = $(() => {
    if (!store.camera) return;
    store.camera.aspect = window.innerWidth / window.innerHeight;
    store.camera.updateProjectionMatrix();
    store.renderer?.setSize(window.innerWidth, window.innerHeight);
    store.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  useOnWindow("resize", handleResize);

  useVisibleTask$(({ track }) => {
    track(() => tweaks.numParticles);
    const canvas = canvasSignal.value;
    if (!canvas) return;

    const { position, speed, size } = generateParticles(tweaks.numParticles);
    const renderer = new THREE.WebGLRenderer({ canvas });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const scene = new THREE.Scene();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("speed", new THREE.BufferAttribute(speed, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(tweaks.color)),
      },
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const points = new THREE.Points(geometry, material);

    scene.add(points);
    scene.add(camera);

    camera.position.z = 5;
    store.renderer = noSerialize(renderer);
    store.camera = noSerialize(camera);
    store.scene = noSerialize(scene);
    store.points = noSerialize(points);
    handleResize();
  });

  useVisibleTask$(({ track }) => {
    track(theme);
    if (!store.points) return;
    const material = store.points.material as THREE.ShaderMaterial;
    material.uniforms.uColor.value = new THREE.Color(
      theme.value === "light" ? "black" : "white"
    );
  });

  useVisibleTask$(() => {
    const clock = new THREE.Clock();
    function animate() {
      if (!store.renderer || !store.camera || !store.scene || !store.points)
        return;

      const elapsedTime = clock.getElapsedTime();
      const material = store.points.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = elapsedTime;

      store.renderer.setClearColor(0x000000, 0);
      store.renderer.render(store.scene, store.camera);

      requestAnimationFrame(animate);
    }
    animate();
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => url.searchParams.has("debug"));
    if (!url.searchParams.has("debug")) return;
    const gui = new GUI({ width: 300 });
    if (!store.points) return;
    const material = store.points.material as THREE.ShaderMaterial;
    gui.addColor(material.uniforms.uColor, "value").name("Particle Color");
    gui.add(tweaks, "numParticles", 100, 10000, 1);
    cleanup(() => gui.destroy());
  });

  return (
    <canvas
      ref={canvasSignal}
      class={css({
        position: "fixed",
        zIndex: -1,
        inset: 0,
        width: "100%",
        height: "100%",
        _motionReduce: {
          display: "none",
        },
      })}
    />
  );
});

export default ParticlesAnimation;
