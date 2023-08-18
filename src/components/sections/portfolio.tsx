import {
  type Component,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { text } from '@styles/recipes';
import Archetyper from '~/images/archetyper.png?jsx&quality=100&imagetools';
import SortEd from '~/images/sorted.png?jsx&quality=100&imagetools';
import WhatsAppening from '~/images/whatsappening.png?jsx&quality=80&imagetools';
import Discordance from '~/images/discordance.png?jsx&quality=100&imagetools';
import { css, cx } from '@styles/css';
import { flex } from '@styles/patterns';
import ReactLogo from '~/images/react.svg?jsx';
import ReduxLogo from '~/images/redux.svg?jsx';
import JavaScriptLogo from '~/images/javascript.svg?jsx';
import TypeScriptLogo from '~/images/typescript.svg?jsx';
import PythonLogo from '~/images/python.svg?jsx';
import MuiLogo from '~/images/mui.svg?jsx';
import ExpressLogo from '~/images/express.svg?jsx';
import CSSLogo from '~/images/css.svg?jsx';

type Technology =
  | 'React'
  | 'Redux'
  | 'JavaScript'
  | 'TypeScript'
  | 'MaterialUI'
  | 'Express'
  | 'CSS'
  | 'Python';

type Project = {
  title: string | Component<{}>;
  technologies: Technology[];
  description: string;
  liveLink?: string;
  githubLink: string;
  key: string;
};

type PortfolioSectionProps = {
  project: Project;
};

const PortfolioSection = component$<PortfolioSectionProps>(({ project }) => {
  const imageMap = {
    archetyper: Archetyper,
    sorted: SortEd,
    whatsappening: WhatsAppening,
    discordance: Discordance,
  };
  const logoMap: Record<Technology, typeof ReactLogo> = {
    React: ReactLogo,
    Redux: ReduxLogo,
    TypeScript: TypeScriptLogo,
    JavaScript: JavaScriptLogo,
    Express: ExpressLogo,
    Python: PythonLogo,
    CSS: CSSLogo,
    MaterialUI: MuiLogo,
  };
  const Image = imageMap[project.key as keyof typeof imageMap];
  const sectionRef = useSignal<Element>();
  const visible = useSignal(false);
  useVisibleTask$(({ cleanup }) => {
    if (!sectionRef.value) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible.value = true;
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(sectionRef.value);

    cleanup(() => observer.disconnect());
  });
  return (
    <section
      ref={sectionRef}
      class={css({
        display: 'flex',
        flexDirection: 'column',
        clipPath: 'inset(0)',
        _before: {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: "url('/images/overlay.png')",
        },
        mdDown: {
          position: 'relative',
        },
        md: {
          minH: 'dvh',
        },
        '&:nth-child(even)': {
          alignItems: 'flex-end',
          md: {
            '& > div': {
              transform: 'translateX(var(--translate))',
            },
          },
        },
        '&:nth-child(odd)': {
          md: {
            '& > div': {
              transform: 'translateX(calc(var(--translate) * -1))',
            },
          },
        },
        overflow: 'hidden',
      })}
      style={{
        '--translate': visible.value ? 0 : '15%',
        '--opacity': visible.value ? 1 : 0,
      }}
    >
      <Image
        class={css({
          md: {
            position: 'fixed',
            inset: '0',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: '0 62px',
            width: 'full',
          },
          zIndex: -2,
        })}
        alt=""
      />
      <div
        class={css({
          background: 'rgba(23, 23, 23, .95)',
          padding: '32px 16px 64px',
          color: 'stone.50',
          sm: {
            padding: '48px 32px 64px',
          },
          md: {
            width: 'max(35%, 400px)',
            maxWidth: '660px',
            padding: '80px 32px',
            height: '100vh',
            transition: 'transform 750ms ease, opacity 750ms ease',
            opacity: 'var(--opacity)',
          },
          lg: {
            padding: '120px 60px',
          },
        })}
      >
        <h3
          class={cx(
            text({
              size: {
                base: 'mobileHero',
                md: 'hero',
              },
            }),
            css({
              marginBottom: '24px',
              borderBottom: '1px solid',
              borderColor: 'teal.700',
            })
          )}
        >
          {typeof project.title === 'string' ? (
            project.title
          ) : (
            <project.title />
          )}
        </h3>

        <p
          class={cx(
            text({ size: 'body' }),
            css({ marginTop: '12px', marginBottom: '24px' })
          )}
        >
          {project.description}
        </p>
        <div
          class={css({
            display: 'flex',
            gap: '12px',
            margin: '24px 0',
            fill: 'stone.50',
            flexWrap: 'wrap',
          })}
        >
          {project.technologies.map((technology) => {
            const Logo = logoMap[technology];
            return (
              <div
                class={css({ width: 'full', maxWidth: '48px' })}
                title={technology}
                key={technology}
              >
                <Logo alt={technology} />
              </div>
            );
          })}
        </div>
        <div
          class={cx(
            flex({
              flexWrap: 'wrap',
              gap: '20px',
              '& a': {
                padding: '12px 24px',
                borderRadius: '12px',
                textAlign: 'center',
              },
            }),
            text({
              size: {
                base: 'mobileBody',
                md: 'body',
              },
            })
          )}
        >
          {project.liveLink && (
            <Link
              class={css({
                background: 'teal.600',
                transition: 'background 250ms ease',
                _hover: {
                  background: 'teal.700',
                },
              })}
              href={project.liveLink}
            >
              Live
            </Link>
          )}
          <Link
            class={css({
              transition: 'color 250ms ease',
              border: '1px solid',
              _hover: {
                color: 'teal.700',
              },
            })}
            href={project.githubLink}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
});

export const Portfolio = component$(() => {
  const projects: Project[] = [
    {
      title: 'archetyper',
      technologies: ['React', 'TypeScript', 'MaterialUI'],
      description:
        'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
      liveLink: 'https://archetyper.vercel.app/',
      githubLink: 'https://github.com/nkuek/archetyper',
      key: 'archetyper',
    },
    {
      title: 'SortEd',
      technologies: ['React', 'JavaScript', 'CSS'],
      description:
        'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
      githubLink: 'https://github.com/nkuek/SortEd',
      liveLink: 'https://sort-ed.vercel.app/',
      key: 'sorted',
    },
    {
      title: component$(() => (
        <>
          Whats
          <wbr />
          Appening
        </>
      )),
      technologies: ['React', 'Redux', 'Express', 'MaterialUI'],
      description:
        'Fully functional clone of the popular messaging app, WhatsApp, built with a React/Redux frontend and an Express/Sequelize backend to create a seamless, single-page application.',
      githubLink: 'https://github.com/nkuek/WhatsAppening',
      key: 'whatsappening',
    },
    {
      title: 'Discordance',
      technologies: ['React', 'Redux', 'JavaScript', 'Python'],
      description:
        'A clone of the popular gaming platform, Discord built with a React/Redux frontend and Flask-SQLAlchemy backend. Features live chat within servers by utilizing web sockets, autocompleting search functionality, and ability to browse public groups by category.',
      githubLink: 'https://github.com/nkuek/discordance',
      key: 'discordance',
    },
  ];
  return (
    <div id="portfolio">
      {projects.map((project, idx) => (
        <PortfolioSection project={project} key={idx} />
      ))}
    </div>
  );
});
