import { $, component$, useOnWindow, useSignal } from "@builder.io/qwik";
import { circle, vstack } from "@styles/patterns";
import ChevronDown from "~/images/chevronDown.svg?jsx";
import { css } from "@styles/css";
import { Link } from "@builder.io/qwik-city";
import RoleTyper from "~/components/roleTyper";
import { Image } from "@unpic/qwik";

export const Hero = component$(() => {
  const hasScrolled = useSignal(false);
  const hideChevron = useSignal(false);

  useOnWindow(
    "scroll",
    $(() => {
      if (window.scrollY > 0 && !hasScrolled.value) {
        hasScrolled.value = true;
      } else if (hasScrolled.value && window.scrollY === 0) {
        hasScrolled.value = false;
        hideChevron.value = false;
      }
    })
  );
  return (
    <section
      class={vstack({
        minH: "calc(100svh - 56px)",
        justifyContent: "center",
        position: "relative",
        paddingInline: 4,
        backgroundImage: "backgroundImage",
      })}
    >
      <div
        class={css({
          gap: 10,
          display: "flex",
          "@media (min-width: 979px)": {
            flexDir: "row",
          },
          alignItems: "center",
          justifyContent: "center",
          flexDir: "column",
          w: "full",
        })}
      >
        <RoleTyper />

        <Image
          src="https://res.cloudinary.com/dunbkcyqq/image/upload/ar_1.0,c_fill,q_90/r_max/v1691183194/profile_uzs6ye.jpg"
          class={circle({
            size: "288px",
            aspectRatio: 1,
            objectFit: "cover",
          })}
          width={288}
          height={288}
          background="auto"
          alt="Picture of me sitting on a wall with a sunset behind me."
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <Link
        href="#about-me"
        style={{
          opacity: hasScrolled.value ? 0 : 1,
          visibility: hideChevron.value ? "hidden" : "visible",
        }}
        onTransitionEnd$={() => {
          if (hasScrolled.value) {
            hideChevron.value = true;
          }
        }}
        class={css({
          color: "inherit",
          position: "absolute",
          bottom: 5,
          transition: "opacity 500ms ease",
          _hover: {
            color: "links.hover",
          },
        })}
        aria-label="go to next section"
      >
        <ChevronDown
          class={css({
            w: {
              base: 6,
              md: 10,
            },
            aspectRatio: 1,
            animation: "bounce linear infinite 1000ms",
          })}
        />
      </Link>
    </section>
  );
});
