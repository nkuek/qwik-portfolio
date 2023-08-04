import { component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { text } from '@styles/recipes';

const AboutMe = component$(() => {
  return (
    <section
      class={css({
        minH: 'dvh',
        p: {
          base: 4,
          md: 8,
          lg: 16,
        },
      })}
    >
      <div
        class={css({
          display: 'grid',
          '@media (min-width: 979px)': {
            gridTemplateColumns: '1fr 1fr 1fr',
          },
          gridTemplateColumns: '1fr',
          w: 'full',
          gap: {
            base: 4,
            md: 10,
          },
        })}
      >
        <div
          class={css({
            gap: 4,
            display: 'flex',
            flexDir: 'column',
            textAlign: 'center',
          })}
        >
          <h2
            class={text({
              size: 'title',
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

        <p class={text({ size: 'body' })}>
          With the pandemic ravaging the country and burnout on my mind, I
          decided to make the tough decision to put my career in medicine on
          hold and dive head first into the world of programming. After
          attending App Academy, I can safely say this was the best decision
          I've made.
        </p>
        <p class={text({ size: 'body' })}>
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
