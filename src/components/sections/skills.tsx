import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { css, cx } from "@styles/css";
import { DSText } from "~/design-system/components/DSText";
import { type Technology, logoMap } from "~/utils/technologies";

const generateSkills = (skills: Technology[]) => {
  return skills.map((skill) => ({ name: skill, ...logoMap[skill] }));
};

const showcaseSkills: Technology[] = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Qwik",
  "CSS",
  "HTML",
  "Svelte",
  "Redux",
  "Python",
  "NodeJS",
  "GSAP",
];

const skills = generateSkills(showcaseSkills);

const Skills = component$(() => {
  const iconContainerRef = useSignal<Element>();

  useVisibleTask$(({ cleanup }) => {
    let minId: number | null = null;
    let maxId: number | null = null;
    let debounceTimeout: NodeJS.Timeout;

    // because intersection observer is asynchronous, if the user scrolls too fast, they can pass over a skill name, meaning the opacity won't be updated
    // this debouncer loops over all skill elements and applies changes if the element is within the range of elements the user has scrolled past
    function applyChanges() {
      const skillElements = document.getElementsByClassName(
        "skill"
      ) as HTMLCollectionOf<HTMLSpanElement>;
      for (const el of skillElements) {
        const elementId = parseInt(el.getAttribute("data-id") ?? "");

        if (minId && elementId >= minId && maxId && elementId <= maxId) {
          el.style.setProperty("--opacity", "1");
        }
      }
      minId = null;
      maxId = null;
    }

    function reportIntersection(entries: IntersectionObserverEntry[]) {
      clearTimeout(debounceTimeout);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const entryId = parseInt(entry.target.getAttribute("data-id") ?? "");
          // keep track of what element the user has scrolled past
          if (minId === null || maxId === null) {
            minId = entryId;
            maxId = entryId;
          } else {
            minId = Math.min(minId, entryId);
            maxId = Math.max(maxId, entryId);
          }
        }
      });
      debounceTimeout = setTimeout(applyChanges, 25);
    }

    const skillsObserver = new IntersectionObserver(reportIntersection, {
      rootMargin: "-60% 0% -40% 0%",
    });

    const skillElements = document.getElementsByClassName("skill");

    for (const el of skillElements) {
      skillsObserver.observe(el);
    }

    cleanup(() => skillsObserver.disconnect());
  });

  useVisibleTask$(({ cleanup }) => {
    if (!iconContainerRef.value) {
      return;
    }
    const iconContainerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          for (let i = 0; i < entries[0].target.children.length; i++) {
            const el = entries[0].target.children[i] as HTMLElement;

            el.style.setProperty("--delay", `${i * 75}ms`);
            el.style.setProperty("--scale", "1");
          }
        }
      },
      { threshold: 0.4 }
    );
    iconContainerObserver.observe(iconContainerRef.value);
    cleanup(() => iconContainerObserver.disconnect());
  });

  return (
    <section
      id="skills"
      class={css({
        padding: "108px 0",
        position: "relative",

        _before: {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundImage: "backgroundImage",
        },
        color: "text",
      })}
    >
      <div>
        <DSText
          size="hero"
          class={css({
            textAlign: "center",
            display: "block",
            md: {
              position: "sticky",
              top: "50%",
            },
          })}
        >
          Honing my craft in...
        </DSText>
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            paddingTop: {
              base: "48px",
              md: "300px",
            },
          })}
        >
          {skills.map((skill, idx) => (
            <span
              data-id={idx + 1}
              class={cx(
                css({
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  opacity: "var(--opacity, .25)",
                  transition: "opacity 250ms ease",
                }),
                "skill"
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
          display: "grid",
          paddingBlock: {
            base: "104px",
            md: "300px",
          },
          paddingInline: {
            base: "16px",
            md: "32px",
            lg: "64px",
          },
          gridTemplateColumns: {
            base: "repeat(2, auto)",
            sm: "repeat(3, auto)",
            md: "repeat(4, auto)",
          },
          gap: "3vmax",
          justifyContent: "center",
          placeItems: "center",
          maxWidth: "1408px",
          margin: "0 auto",
          fill: "text",
        })}
      >
        {skills.map((skill, idx) => {
          return (
            <Link
              key={idx}
              href={skill.href}
              class={css({
                transition: "transform 500ms ease",
                _hover: {
                  transform: "scale(1.05)",
                },
                "& > *": {
                  aspectRatio: 1,
                  width: "full",
                  height: "auto",
                  transitionProperty: "transform",
                  transitionDelay: "var(--delay)",
                  transitionTimingFunction: "ease",
                  transitionDuration: "500ms",
                  transform: "scale(var(--scale, .75))",
                  maxWidth: "200px",
                  fill: "text",
                },
              })}
              target="_blank"
              rel="noopener"
              aria-label={skill.name}
            >
              <skill.logo alt={skill.name} />
            </Link>
          );
        })}
      </div>
    </section>
  );
});

export default Skills;
