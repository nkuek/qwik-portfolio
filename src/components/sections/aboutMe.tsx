import { component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { vstack } from '@styles/patterns';
import { text } from '@styles/recipes';

const AboutMe = component$(() => {
  return (
    <section
      class={css({
        display: 'flex',
        '@media (min-width: 979px)': {
          flexDir: 'row',
        },
        flexDir: 'column',
        gap: 10,
        minH: 'dvh',
      })}
    >
      <div class={vstack({ gap: 4 })}>
        <h2
          class={text({
            size: {
              base: 'mobileHero',
              md: 'hero',
            },
          })}
        >
          About Me
        </h2>
        <h3
          class={text({
            size: 'mobileSubtitle',
          })}
        >
          An EMT turned Software Engineer
        </h3>
      </div>
      <div
        class={css({
          display: 'flex',
          '@media (min-width: 979px)': {
            flexDir: 'row',
          },
          flexDir: 'column',
          gap: 8,
        })}
      >
        <p>
          With the pandemic ravaging the country and burnout on my mind, I
          decided to make the tough decision to put my career in medicine on
          hold and dive head first into the world of programming. After
          attending App Academy, I can safely say this was the best decision
          I've made.
        </p>
        <p>
          By channeling the work ethic and interpersonal skills I gained as an
          EMT, I have developed a passion for frontend development, which you
          will see in the projects I've listed below. Outside of software
          engineering and medicine, I enjoy hiking, guitar, and building custom
          mechanical keyboards.
        </p>
      </div>
    </section>
  );
});

export default AboutMe;
