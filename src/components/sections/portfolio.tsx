import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { text } from '@styles/recipes';

type Project = {
  title: string;
  technologies: string[];
  description: string;
  liveLink?: string;
  githubLink: string;
};

const projects: Project[] = [
  {
    title: 'archetyper',
    technologies: ['React', 'Redux', 'TypeScript', 'MaterialUI', 'Recharts'],
    description:
      'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
    liveLink: 'https://archetyper.vercel.app/',
    githubLink: 'https://github.com/nkuek/archetyper',
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
  },
  {
    title: 'SortEd',
    technologies: ['React', 'JavaScript', 'CSS', 'MaterialUI'],
    description:
      'An aesthetic, fully-themed type tester to calculate and visualize your words per minute.',
    githubLink: 'https://github.com/nkuek/SortEd',
    liveLink: 'https://sort-ed.vercel.app/',
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
  },
];

type PortfolioSectionProps = {
  project: Project;
};

const PortfolioSection = component$<PortfolioSectionProps>(({ project }) => {
  return (
    <section>
      <h3 class={text({ size: 'title' })}>{project.title}</h3>
      <span class={text({ size: 'mobileSubtitle' })}>
        {project.technologies.join(', ')}
      </span>
      <p class={text({ size: 'body' })}>{project.description}</p>
      <div>
        {project.liveLink && <Link href={project.liveLink}>Live</Link>}
        <Link href={project.githubLink}>GitHub</Link>
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
