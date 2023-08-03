import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { hstack } from '@styles/patterns';

type NavbarSection = {
  title: string;
  href: string;
};

const sections: NavbarSection[] = [
  { title: 'Resume', href: '/resume' },
  { title: 'About Me', href: '#about-me' },
  { title: 'Portfolio', href: '#portfolio' },
  { title: 'Skills', href: '#skills' },
  { title: 'Education', href: '#education' },
  { title: 'Contact', href: '#contact' },
  { title: 'Snippets', href: '/snippets' },
];

export const Navbar = component$(() => {
  return (
    <ul
      class={hstack({
        gap: 6,
        justifyContent: 'flex-end',
        px: 6,
        fontSize: 16,
      })}
    >
      {sections.map((section, idx) => (
        <li key={idx} class={css({ display: 'flex' })}>
          <Link href={section.href} class={css({ h: 'full', py: 3.5 })}>
            {section.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});
