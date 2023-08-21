import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { css } from '@styles/css';
import { ThemeContext } from '~/root';

const NUM_PARTICLES = 100;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

function createParticle(
  canvasWidth: number,
  canvasHeight: number,
  particle?: Particle
): Particle {
  return {
    x: particle?.x ?? Math.random() * canvasWidth,
    y: particle?.y ?? Math.random() * canvasHeight,
    size: particle?.size ?? Math.random() * 3 + 1,
    speedX: particle?.speedX ?? Math.random() * 1 - 0.5,
    speedY: particle?.speedY ?? Math.random() * 1 - 0.5,
  };
}

const ParticlesAnimation = component$(() => {
  const canvasSignal = useSignal<HTMLCanvasElement | undefined>();
  const particles = useSignal<Particle[]>([]);

  const theme = useContext(ThemeContext);

  useVisibleTask$(() => {
    const canvas = canvasSignal.value;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    let prevCanvasHeight: number;
    let prevCanvasWidth: number;
    let isCreated = false;
    console.log('running');

    function updateCanvasSize() {
      if (!canvas) {
        return;
      }

      prevCanvasHeight = isCreated ? canvas.height : window.innerHeight;
      prevCanvasWidth = isCreated ? canvas.width : window.innerWidth;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // calculate ratio to determine position after screen resize
      const widthRatio = canvas.width / prevCanvasWidth;
      const heightRatio = canvas.height / prevCanvasHeight;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.value[i] = createParticle(
          canvas.width,
          canvas.height,
          particles.value[i]
        );
        particles.value[i].x *= widthRatio;
        particles.value[i].y *= heightRatio;
      }
      isCreated = true;
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    function update(particle: Particle) {
      if (!canvas) {
        return;
      }
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around the screen
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;
    }

    function draw(ctx: CanvasRenderingContext2D, particle: Particle) {
      ctx.fillStyle = theme.value === 'light' ? '#171717' : '#FAFAF9';
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const particle of particles.value) {
        update(particle);
        draw(ctx, particle);
      }

      requestAnimationFrame(animate);
    }

    animate();
  });

  return (
    <canvas
      ref={canvasSignal}
      class={css({
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: '-1',
        _motionReduce: {
          display: 'none',
        },
      })}
    />
  );
});

export default ParticlesAnimation;
