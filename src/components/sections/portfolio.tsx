import {
  type Component,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { css } from "@styles/css";
import { flex } from "@styles/patterns";
import { Image } from "@unpic/qwik";
import { DSButtonLink } from "~/design-system/components/DSLink";
import { DSText } from "~/design-system/components/DSText";
import { type Technology, logoMap } from "~/utils/technologies";

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
    title: "archetyper",
    technologies: ["React", "TypeScript", "MaterialUI", "CSS"],
    description:
      "Elevate your typing experience with this meticulously designed, fully-themed type tester. Calculate and visualize your words per minute in style.",
    liveLink: "https://archetyper.xyz/",
    githubLink: "https://github.com/nkuek/archetyper",
    src: "https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/archetyper_itxv7j.png",
  },
  {
    title: "SortEd",
    technologies: ["React", "JavaScript", "CSS", "MaterialUI"],
    description:
      "Discover the elegance of sorting algorithms through an interactive visualizer built with React. Customize themes, sizes, and speeds for deeper understanding and coding insights.",
    githubLink: "https://github.com/nkuek/SortEd",
    liveLink: "https://sort-ed.vercel.app/",
    src: "https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/sorted_xq4pik.png",
  },
  {
    title: component$(() => (
      <>
        Whats
        <wbr />
        Appening
      </>
    )),
    technologies: ["React", "Redux", "Express", "MaterialUI"],
    description:
      "A fully functional clone of the popular messaging app WhatsApp that employs a React/Redux frontend and an Express/Sequelize backend, enabling a real-time messaging experience on a single-page application.",
    githubLink: "https://github.com/nkuek/WhatsAppening",
    src: "https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/whatsappening_gcaib9.png",
  },
  {
    title: "Discordance",
    technologies: ["React", "Redux", "JavaScript", "Python"],
    description:
      "A Discord-like clone, powered by React/Redux on the frontend and Flask-SQLAlchemy on the backend. It enables live server chat via web sockets, offers auto-complete search, and allows users to explore public groups by category.",
    githubLink: "https://github.com/nkuek/discordance",
    src: "https://res.cloudinary.com/dunbkcyqq/image/upload/v1692465807/discordance_oywept.png",
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
        "--translate": visible.value ? 0 : "15%",
        "--opacity": visible.value ? 1 : 0,
        "--animation-state": visible.value ? "running" : "paused",
      }}
      class={css({
        display: "flex",
        flexDirection: "column",
        clipPath: "inset(0)",
        position: "relative",
        _before: {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundImage: "url('/images/overlay.png')",
        },
        "& h3, & .technologiesContainer": {
          _after: {
            animationName: "revealLeftToRight",
            animationPlayState: "var(--animation-state)",
            animationDuration: "1000ms",
            animationTimingFunction: "ease-out",
          },
        },
        md: {
          minH: "100vh",
          "&:nth-child(even)": {
            alignItems: "flex-end",
            "& > div": {
              transform: "translateX(var(--translate))",
            },
            "& h3, & .technologiesContainer": {
              _after: {
                animationName: "revealRightToLeft",
                animationPlayState: "var(--animation-state)",
              },
            },
          },
          "&:nth-child(odd)": {
            "& > div": {
              transform: "translateX(calc(var(--translate) * -1))",
            },
            "& h3, & .technologiesContainer": {
              _after: {
                animationName: "revealLeftToRight",
                animationPlayState: "var(--animation-state)",
              },
            },
          },
        },
        overflow: "hidden",
      })}
    >
      <Image
        class={css({
          md: {
            position: "fixed",
            inset: "0",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "0 62px",
            width: "full",
            aspectRatio: "unset",
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
          background: "rgba(23, 23, 23, .95)",
          color: "stone.50",
          md: {
            width: "max(35%, 400px)",
            maxWidth: "660px",
            height: "100vh",
            transition: "transform 750ms ease, opacity 750ms ease",
            opacity: "var(--opacity)",
          },
          padding: {
            base: "48px 16px 64px",
            md: "80px 32px",
            lg: "120px 48px",
          },
        })}
      >
        <DSText
          tag="h3"
          size="hero"
          class={css({
            marginBottom: "24px",
            position: "relative",
            _after: {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "1px",
              background: "teal.700",
            },
          })}
        >
          {typeof project.title === "string" ? (
            project.title
          ) : (
            <project.title />
          )}
        </DSText>
        <DSText
          tag="p"
          size="body"
          class={css({ marginTop: "12px", marginBottom: "24px" })}
        >
          {project.description}
        </DSText>
        <div
          class={flex({
            flexWrap: "wrap",
            gap: "20px",
            "& a": {
              padding: "12px 24px",
              borderRadius: "12px",
              textAlign: "center",
            },
          })}
        >
          {project.liveLink && (
            <DSButtonLink href={project.liveLink} variant="primary">
              Live
            </DSButtonLink>
          )}
          <DSButtonLink href={project.githubLink} variant="secondary">
            GitHub
          </DSButtonLink>
        </div>
        <div
          class={[
            css({
              display: "flex",
              gap: "12px",
              margin: "48px 0",
              padding: "24px 0",
              flexWrap: "wrap",
              position: "relative",
              _after: {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "1px",
                background: "teal.700",
              },
            }),
            "technologiesContainer",
          ]}
        >
          {project.technologies.map((technology) => {
            const technologyInfo = logoMap[technology];
            return (
              <DSButtonLink
                variant="tertiary"
                size="small"
                href={technologyInfo.href}
                target="_blank"
                rel="noopener"
                key={technology}
              >
                {technology}
              </DSButtonLink>
            );
          })}
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
