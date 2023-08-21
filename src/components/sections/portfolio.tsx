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
  width: number;
  height: number;
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
    width: 2876,
    height: 1578,
  },
  {
    title: 'SortEd',
    technologies: ['React', 'JavaScript', 'CSS', 'MaterialUI'],
    description:
      'Discover the elegance of sorting algorithms through an interactive visualizer built with React. Customize themes, sizes, and speeds for deeper understanding and coding insights.',
    githubLink: 'https://github.com/nkuek/SortEd',
    liveLink: 'https://sort-ed.vercel.app/',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/sorted_xq4pik.png',
    width: 2560,
    height: 1440,
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
    width: 1924,
    height: 1309,
  },
  {
    title: 'Discordance',
    technologies: ['React', 'Redux', 'JavaScript', 'Python'],
    description:
      'A Discord-like clone, powered by React/Redux on the frontend and Flask-SQLAlchemy on the backend. It enables live server chat via web sockets, offers auto-complete search, and allows users to explore public groups by category.',
    githubLink: 'https://github.com/nkuek/discordance',
    src: 'https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/discordance_oywept.png',
    width: 1839,
    height: 875,
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
        md: {
          minH: '100vh',
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
        width={project.width}
        aspectRatio="325/206"
        src={project.src}
        background="auto"
        layout="constrained"
        breakpoints={[767, 1440]}
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
