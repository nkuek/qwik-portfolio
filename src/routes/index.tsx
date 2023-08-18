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
  ],
};
