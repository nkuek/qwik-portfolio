import { component$ } from '@builder.io/qwik';
import { circle, vstack } from '@styles/patterns';
import ProfilePic from '~/images/profile.jpg?jsx';
import ChevronDown from '~/images/chevronDown.svg?jsx';
import { css } from '@styles/css';
import { Link } from '@builder.io/qwik-city';
import RoleTyper from '~/components/roleTyper';

export const Hero = component$(() => {
  return (
    <section
      class={vstack({
        minH: 'calc(100dvh - 56px)',
        justifyContent: 'center',
        position: 'relative',
      })}
    >
      <div
        class={css({
          gap: 10,
          display: 'flex',
          '@media (min-width: 979px)': {
            flexDir: 'row',
          },
          alignItems: 'center',
          justifyContent: 'center',
          flexDir: 'column',
        })}
      >
        <RoleTyper />
        <ProfilePic
          class={circle({
            size: {
              base: '144px',
              mdTo2xl: '288px',
            },
            objectFit: 'cover',
          })}
          alt="Picture of me sitting on a wall with a sunset behind me."
        />
      </div>
      <Link
        href="#about-me"
        class={css({ color: 'inherit', position: 'absolute', bottom: 5 })}
        aria-label="go to next section"
      >
        <ChevronDown
          class={css({
            w: {
              base: 6,
              md: 10,
            },
            aspectRatio: 1,
            animation: 'bounce linear infinite 1000ms',
          })}
          alt=""
        />
      </Link>
    </section>
  );
});
