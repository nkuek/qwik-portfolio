import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import { text } from '@styles/recipes';
import GSAPLogo from '~/images/gsap.png?jsx';
import QwikLogo from '~/images/qwik.svg?jsx';
import JavaScriptLogo from '~/images/javascript.svg?jsx';
import TypeScriptLogo from '~/images/typescript.svg?jsx';
import NextJSLogo from '~/images/nextjs.svg?jsx';
import CSSLogo from '~/images/css.svg?jsx';
import HTMLLogo from '~/images/html.svg?jsx';
import SvelteLogo from '~/images/svelte.svg?jsx';
import ReduxLogo from '~/images/redux.svg?jsx';
import PythonLogo from '~/images/python.svg?jsx';
import NodeJSLogo from '~/images/node.svg?jsx';
import ReactLogo from '~/images/react.svg?jsx';

const Skills = component$(() => {
  const iconContainerRef = useSignal<Element>();
  const skills = [
    { name: 'TypeScript', logo: TypeScriptLogo },
    { name: 'JavaScript', logo: JavaScriptLogo },
    { name: 'React', logo: ReactLogo },
    { name: 'NextJS', logo: NextJSLogo },
    { name: 'QwikJS', logo: QwikLogo },
    { name: 'CSS', logo: CSSLogo },
    { name: 'HTML', logo: HTMLLogo },
    { name: 'Svelte', logo: SvelteLogo },
    { name: 'Redux', logo: ReduxLogo },
    { name: 'Python', logo: PythonLogo },
    { name: 'NodeJS', logo: NodeJSLogo },
    { name: 'GSAP', logo: GSAPLogo },
  ];

  useVisibleTask$(({ cleanup }) => {
    if (!iconContainerRef.value) {
      return;
    }
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '-70% 0% -30% 0%' }
    );
    const skillElements = document.getElementsByClassName('skill');

    for (const el of skillElements) {
      skillsObserver.observe(el);
    }

    const iconContainerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          for (let i = 0; i < entries[0].target.children.length; i++) {
            const el = entries[0].target.children[i] as HTMLElement;

            el.style.setProperty('--delay', `${i * 75}ms`);
            el.classList.add('animate');
          }
        }
      },
      { threshold: 0.5 }
    );
    iconContainerObserver.observe(iconContainerRef.value);

    cleanup(() => {
      skillsObserver.disconnect();
      iconContainerObserver.disconnect();
    });
  });

  useStylesScoped$(`
  .visible {
    opacity: 1
  }

  .animate {
    transition: transform 500ms ease var(--delay);
    transform: scale(1)
  }
  `);

  return (
    <section
      id="skills"
      class={css({
        padding: '108px 0',
        position: 'relative',

        _before: {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: 'backgroundImage',
        },
        color: 'text',
      })}
    >
      <div>
        <div
          class={cx(
            css({
              textAlign: 'center',
              md: {
                position: 'sticky',
                top: '50%',
              },
            }),
            text({ size: { base: 'mobileHero', md: 'hero' } })
          )}
        >
          Honing my craft in...
        </div>
        <div
          class={css({
            display: 'flex',
            flexDirection: 'column',
            paddingTop: {
              base: '48px',
              md: '300px',
            },
          })}
        >
          {skills.map((skill) => (
            <span
              id="skill"
              class={cx(
                css({ fontSize: 'clamp(3rem, 7vw, 7rem)', opacity: 0.25 }),
                'skill'
              )}
              key={skill.name}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      <div
        ref={iconContainerRef}
        class={css({
          display: 'grid',
          paddingBlock: {
            base: '48px',
            md: '300px',
          },
          gridTemplateColumns: {
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          paddingInline: '16px',
          gap: '3vmax',
          justifyContent: 'center',
          placeItems: 'center',
          maxWidth: '1408px',
          margin: '0 auto',
          fill: 'text',
        })}
      >
        {skills.map((skill, idx) => {
          const sharedCSS = css({
            aspectRatio: 1,
            width: 'full',
            height: 'full',
            transform: 'scale(.75)',
          });

          return <skill.logo key={idx} class={sharedCSS} />;
        })}
      </div>
    </section>
  );
});

export default Skills;
