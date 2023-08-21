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

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 3 + 1,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 - 0.5,
  };
}

type WindowDimensions = {
  height: number;
  width: number;
};

const ParticlesAnimation = component$(() => {
  const canvasSignal = useSignal<HTMLCanvasElement | undefined>();
  const particles: Particle[] = [];
  const windowDimensions = useSignal<WindowDimensions | undefined>();

  const theme = useContext(ThemeContext);

  useVisibleTask$(() => {
    windowDimensions.value = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    const canvas = canvasSignal.value;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(createParticle(canvas.width, canvas.height));
    }

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
      if (!ctx || !windowDimensions.value) {
        return;
      }
      ctx.clearRect(
        0,
        0,
        windowDimensions.value.width,
        windowDimensions.value.height
      );

      for (const particle of particles) {
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
      })}
    />
  );
});

export default ParticlesAnimation;
