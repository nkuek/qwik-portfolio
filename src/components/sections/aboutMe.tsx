import { component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { text } from '@styles/recipes';
import Overlook from '~/images/overlook.jpeg?jsx&quality=80&imagetools';

const AboutMe = component$(() => {
  return (
    <section
      id="about-me"
      class={css({
        md: {
          minH: 'dvh',
        },
        smDown: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },
        scrollMargin: '56px',
        display: 'flex',
        clipPath: 'inset(0)',
        _before: {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: "url('/images/overlay.png')",
        },
      })}
    >
      <Overlook
        alt="Me overlooking a sunset"
        class={css({
          zIndex: -2,
          md: {
            position: 'fixed',
            inset: '0',
            height: '100vh',
            objectFit: 'cover',
            width: 'full',
          },
        })}
      />
      <div
        class={css({
          display: 'grid',
          '@media (min-width: 979px)': {
            gridTemplateColumns: 'minmax(0, 1fr) 1fr 1fr',
            minHeight: '35vh',
          },
          alignSelf: 'flex-end',
          height: 'fit-content',
          gridTemplateColumns: '1fr',
          w: 'full',
          gap: {
            base: 4,
            md: 10,
          },
          padding: '104px 0',
          position: 'relative',
          background: 'rgba(23, 23, 23, .90)',
          paddingInline: {
            base: '16px',
            sm: '32px',
            md: '48px',
          },
        })}
      >
        <div
          class={css({
            gap: 4,
            display: 'flex',
            flexDir: 'column',
            '@media (min-width: 979px)': {
              textAlign: 'left',
            },
            textAlign: 'center',
            marginBottom: '24px',
          })}
        >
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
