import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { css, cx } from "@styles/css";
import {
  getButtonClassFromVariant,
  type DSButtonPropsBase,
} from "~/design-system/components/DSButton";
import { DSText, type DSTextProps } from "~/design-system/components/DSText";

type DSLinkProps = Omit<QwikIntrinsicElements["a"], "class"> &
  Omit<DSTextProps, "tag"> & {
    class?: string;
  };

export const DSLink = component$(
  ({ size, class: classExtension, ...props }: DSLinkProps) => {
    return (
      <Link
        class={cx(
          css({
            _hover: {
              color: "links.hover",
            },
          }),
          classExtension
        )}
        {...props}
      >
        <DSText size={size}>
          <Slot />
        </DSText>
      </Link>
    );
  }
);

type DSButtonLinkProps = QwikIntrinsicElements["a"] & DSButtonPropsBase;

export const DSButtonLink = component$(
  ({
    variant,
    class: classExtension,
    size = "big",
    ...props
  }: DSButtonLinkProps) => {
    const buttonClass = getButtonClassFromVariant(variant, size);
    return (
      <Link {...props} class={cx(buttonClass, classExtension)}>
        <Slot />
      </Link>
    );
  }
);

export const DSLinkContainer = component$(
  ({ class: classExtension, ...props }: Omit<DSLinkProps, "size">) => {
    return (
      <Link
        {...props}
        class={cx(css({ _hover: { color: "links.hover" } }), classExtension)}
      >
        <Slot />
      </Link>
    );
  }
);
