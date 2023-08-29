import {
  type Component,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { text } from '@styles/recipes';
import { css, cx } from '@styles/css';
import { flex } from '@styles/patterns';
import { Image } from '@unpic/qwik';
import { type Technology, logoMap } from '~/utils/technologies';

type Project = {
  title: string | Component<{}>;
  technologies: Technology[];
  description: string;
  liveLink?: string;
  githubLink: string;
  src: string;
};

type PortfolioSectionProps = {
  project: Project;
};

const projects: Project[] = [
  {
    title: 'archetyper',
    technologies: ['React', 'TypeScript', 'MaterialUI'],
    description:
      'Elevate your typing experience with this meticulously designed, fully-themed type tester. Calculate and visualize your words per minute in style.',
    liveLink: 'https://archetyper.vercel.app/',
    githubLink: 'https://github.com/nkuek/archetyper',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/archetyper_itxv7j.png',
  },
  {
    title: 'SortEd',
    technologies: ['React', 'JavaScript', 'CSS', 'MaterialUI'],
    description:
      'Discover the elegance of sorting algorithms through an interactive visualizer built with React. Customize themes, sizes, and speeds for deeper understanding and coding insights.',
    githubLink: 'https://github.com/nkuek/SortEd',
    liveLink: 'https://sort-ed.vercel.app/',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/sorted_xq4pik.png',
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
      'A fully functional clone of the popular messaging app WhatsApp that employs a React/Redux frontend and an Express/Sequelize backend, enabling a real-time messaging experience on a single-page application.',
    githubLink: 'https://github.com/nkuek/WhatsAppening',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/whatsappening_gcaib9.png',
  },
  {
    title: 'Discordance',
    technologies: ['React', 'Redux', 'JavaScript', 'Python'],
    description:
      'A Discord-like clone, powered by React/Redux on the frontend and Flask-SQLAlchemy on the backend. It enables live server chat via web sockets, offers auto-complete search, and allows users to explore public groups by category.',
    githubLink: 'https://github.com/nkuek/discordance',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/discordance_oywept.png',
  },
];

const PortfolioSection = component$<PortfolioSectionProps>(({ project }) => {
  // const Image = imageMap[project.key as keyof typeof imageMap];
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
      style={{
        '--translate': visible.value ? 0 : '15%',
        '--opacity': visible.value ? 1 : 0,
        '--animation-state': visible.value ? 'running' : 'paused',
      }}
      class={css({
        display: 'flex',
        flexDirection: 'column',
        clipPath: 'inset(0)',
        position: 'relative',
        _before: {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: "url('/images/overlay.png')",
        },
        '& h3': {
          _after: {
            animationName: 'revealLeftToRight',
            animationPlayState: 'var(--animation-state)',
            animationDuration: '1000ms',
            animationTimingFunction: 'ease-out',
          },
        },
        md: {
          minH: '100vh',
          '&:nth-child(even)': {
            alignItems: 'flex-end',
            '& > div': {
              transform: 'translateX(var(--translate))',
            },
            '& h3': {
              _after: {
                animationName: 'revealRightToLeft',
                animationPlayState: 'var(--animation-state)',
              },
            },
          },
          '&:nth-child(odd)': {
            '& > div': {
              transform: 'translateX(calc(var(--translate) * -1))',
            },
            '& h3': {
              _after: {
                animationName: 'revealLeftToRight',
                animationPlayState: 'var(--animation-state)',
              },
            },
          },
        },
        overflow: 'hidden',
      })}
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
            aspectRatio: 'unset',
          },
          aspectRatio: 325 / 206,
          zIndex: -2,
        })}
        alt=""
        src={project.src}
        background="auto"
        layout="constrained"
        breakpoints={[768, 1440]}
      />
      <div
        class={css({
          background: 'rgba(23, 23, 23, .95)',
          color: 'stone.50',
          md: {
            width: 'max(35%, 400px)',
            maxWidth: '660px',
            height: '100vh',
            transition: 'transform 750ms ease, opacity 750ms ease',
            opacity: 'var(--opacity)',
          },
          padding: {
            base: '48px 16px 64px',
            md: '80px 32px',
            lg: '120px 48px',
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
              position: 'relative',
              _after: {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '1px',
                background: 'teal.700',
              },
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
            const technologyInfo = logoMap[technology];
            return (
              <div
                class={css({ width: 'full', maxWidth: '48px' })}
                title={technology}
                key={technology}
              >
                <Link
                  href={technologyInfo.href}
                  target="_blank"
                  rel="noopener"
                  class={css({})}
                  aria-label={technology}
                >
                  <technologyInfo.logo
                    alt={technology}
                    class={css({
                      fill: 'stone.50',
                      transition: 'transform 250ms ease',
                      _hover: {
                        transform: 'scale(1.05)',
                      },
                    })}
                  />
                </Link>
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
  return (
    <div id="portfolio">
      {projects.map((project, idx) => (
        <PortfolioSection project={project} key={idx} />
      ))}
    </div>
  );
});
