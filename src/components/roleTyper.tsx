import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { css } from "@styles/css";
import { vstack } from "@styles/patterns";
import { DSText } from "~/design-system/components/DSText";

const roles = [
  "Software Engineer",
  "Keyboard Hobbyist",
  "Frontend Developer",
  "CSS Enthusiast",
];

const RoleTyper = component$(() => {
  const roleIndex = useSignal(0);

  const role = useComputed$(() => {
    return roles[roleIndex.value];
  });

  return (
    <div class={vstack({ gap: 4 })}>
      <DSText size="hero" tag="h1">
        Hi, Iʼm Nick Kuek
      </DSText>
      <div
        class={css({
          w: "full",
          display: "inline",
        })}
      >
        <div
          class={css({
            width: "full",
            display: "flex",
            minW: {
              base: "344px",
              md: "473px",
            },
            "@media (max-width: 400px)": {
              flexDir: "column",
              alignItems: "center",
              minW: "unset",
            },
          })}
        >
          <DSText size="subtitle" class={css({ marginRight: ".25em" })}>
            Iʼm a
          </DSText>
          <DSText
            size="subtitle"
            onAnimationIteration$={(event) => {
              if (
                event.animationName === "type" &&
                event.pseudoElement === "::before"
              ) {
                const newIdx = roleIndex.value + 1;
                roleIndex.value = newIdx % roles.length;
              }
            }}
            style={{
              // add 1 to account for period
              "--textLength": role.value.length + 1,
              "--typeSpeed": "4.5s",
            }}
            class={css({
              fontFamily: "sourceCodePro",
              textDecoration: "underline",
              textDecorationColor: "teal.700",
              position: "relative",
              width: "max-content",
              // overlay to hide the words and reveal each letter one at a time
              // overlay should match the same color as the page background
              _before: {
                content: '""',
                position: "absolute",
                md: {
                  top: "-.35em",
                  bottom: "-.35em",
                },
                top: "-.25em",
                bottom: "-.25em",
                right: 0,
                left: 0,
                background: "background",
                backgroundImage: "backgroundImage",
                animation:
                  "type var(--typeSpeed) steps(var(--textLength)) infinite",
              },
              // blinking cursor
              _after: {
                content: '""',
                position: "absolute",
                md: {
                  top: "-.35em",
                  bottom: "-.35em",
                },
                top: "-.25em",
                bottom: "-.25em",
                right: 0,
                left: 0,
                width: "0.125em",
                background: "teal.600",
                animation:
                  "type var(--typeSpeed) steps(var(--textLength)) infinite, blink var(--typeSpeed) infinite",
              },
            })}
          >
            {role.value}.
          </DSText>
        </div>
      </div>
    </div>
  );
});

export default RoleTyper;
