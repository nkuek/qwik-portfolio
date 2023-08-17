import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { text } from '@styles/recipes';
import Archetyper from '~/images/archetyper.png?jsx&quality=100&imagetools';
import SortEd from '~/images/sorted.png?jsx&quality=100&imagetools';
import WhatsAppening from '~/images/whatsappening.png?jsx&quality=80&imagetools';
import Discordance from '~/images/discordance.png?jsx&quality=100&imagetools';
import { css, cx } from '@styles/css';
import { grid } from '@styles/patterns';

type Project = {
  title: string;
  technologies: string[];
  description: string;
  liveLink?: string;
  githubLink: string;
  key: string;
};

const projects: Project[] = [
  {
    title: 'archetyper',
    technologies: ['React', 'Redux', 'TypeScript', 'MaterialUI', 'Recharts'],
    description:
      'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
    liveLink: 'https://archetyper.vercel.app/',
    githubLink: 'https://github.com/nkuek/archetyper',
    key: 'archetyper',
  },
  {
    title: 'SortEd',
    technologies: ['React', 'JavaScript', 'CSS', 'MaterialUI'],
    description:
      'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
    githubLink: 'https://github.com/nkuek/SortEd',
    liveLink: 'https://sort-ed.vercel.app/',
    key: 'sorted',
  },
  {
    title: 'WhatsAppening',
    technologies: [
      'React',
      'Redux',
      'Express',
      'Sequelize',
      'Socket.IO',
      'MaterialUI',
    ],
    description:
      'Fully functional clone of the popular messaging app, WhatsApp, built with a React / Redux frontend and an Express / Sequelize backend to create a seamless, single-page application.',
    githubLink: 'https://github.com/nkuek/WhatsAppening',
    key: 'whatsappening',
  },
  {
    title: 'Discordance',
    technologies: [
      'React',
      'Redux',
      'JavaScript',
      'Python',
      'Flask',
      'Flask-Socket.IO',
      'SQLAlchemy',
    ],
    description:
      'A clone of the popular gaming platform, Discord built with a React / Redux frontend and Flask-SQLAlchemy backend. Features live chat within servers by utilizing web sockets, autocompleting search functionality, and ability to browse public groups by category.',
    githubLink: 'https://github.com/nkuek/discordance',
    key: 'discordance',
  },
];

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
  const Image = imageMap[project.key as keyof typeof imageMap];
  return (
    <section
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
        minH: 'dvh',
        '&:nth-child(even)': {
          alignItems: 'flex-end',
        },
      })}
    >
      <Image
        class={css({
          position: 'fixed',
          inset: '0',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: '0 62px',
          width: 'full',
          zIndex: -2,
        })}
        alt=""
      />
      <div
        class={css({
          width: '35%',
          paddingBlock: '120px',
          paddingInline: '60px',
          background: 'rgba(23, 23, 23, .90)',
          height: '100vh',
        })}
      >
        <h3
          class={cx(
            text({ size: 'title' }),
            css({
              marginBottom: '24px',
              borderBottom: '1px solid',
              borderColor: 'teal.700',
            })
          )}
        >
          {project.title}
        </h3>
        <span class={text({ size: 'mobileSubtitle' })}>
          {project.technologies.join(', ')}
        </span>
        <p
          class={cx(
            text({ size: 'body' }),
            css({ marginTop: '12px', marginBottom: '24px' })
          )}
        >
          {project.description}
        </p>
        <div
          class={cx(
            grid({
              columns: 2,
              width: '50%',
              gap: '20px',
              '& a': {
                padding: '12px 24px',
                borderRadius: '12px',
                textAlign: 'center',
              },
            }),
            text({ size: 'body' })
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
    <div>
      {projects.map((project) => (
        <PortfolioSection project={project} key={project.title} />
      ))}
    </div>
  );
});
