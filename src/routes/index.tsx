import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AboutMe from '~/components/sections/aboutMe';
import { Hero } from '~/components/sections/hero';

export default component$(() => {
  return (
    <>
      <Hero />
      <AboutMe />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Nick Kuek',
  meta: [
    {
      name: "Nick Kuek's Web Developer Portfolio",
      content: 'Web Developer Portfolio',
    },
  ],
};
