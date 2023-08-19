import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AboutMe from '~/components/sections/aboutMe';
import { Hero } from '~/components/sections/hero';
import { Portfolio } from '~/components/sections/portfolio';
import Skills from '~/components/sections/skills';

export default component$(() => {
  return (
    <>
      <Hero />
      <AboutMe />
      <Portfolio />
      <Skills />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Nick Kuek',
  meta: [
    {
      name: 'description',
      content: "Nick Kuek's Web Developer Portfolio",
    },
    {
      name: 'og:title',
      content: 'Nick Kuek',
    },
    {
      name: 'og:description',
      content: "Nick Kuek's Web Developer Portfolio",
    },
    {
      name: 'og:image',
      content: 'https://nkuek.dev/images/profile.jpg',
    },
    {
      name: 'og:type',
      content: 'website',
    },
  ],
  links: [{ rel: 'canonical', href: 'https://nkuek.dev/' }],
};
