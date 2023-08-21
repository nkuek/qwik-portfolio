import { Slot, component$ } from '@builder.io/qwik';
import { css } from '@styles/css';

type LiquidFillButtonProps = {
  breakdown?: boolean;
  darkBackground?: boolean;
  showcase?: boolean;
};

export const LiquidFillButton = component$<LiquidFillButtonProps>(
  ({ breakdown, darkBackground, showcase }) => {
    return (
      <button
        class={css({
          transform: 'scale(.65)',
          sm: {
            transform: 'scale(.75)',
          },
          md: {
            transform: 'none',
          },
          display: ' flex',
          padding: '12px 24px',
          alignItems: 'center',
          border: '1px solid',
          borderRadius: '24px',
          width: 'fit-content',
          height: 'fit-content',
          position: 'relative',
          zIndex: 1,
          fontSize: '2em',
          overflow: breakdown ? 'initial' : 'hidden',
          color: darkBackground ? 'stone.50' : 'text',
          transition: 'color 500ms ease',
          _before: {
            content: '""',
            position: 'absolute',
            right: 0,
            left: 0,
            aspectRatio: '1.25/1',
            minHeight: '100%',
            zIndex: -1,
            borderRadius: '40%',
            transform: 'translateX(-100%) rotate(0deg)',
            transitionProperty: 'transform',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: breakdown ? '2s' : '.5s',
            background: 'teal.600',
            animation: showcase
              ? 'buttonShowcase 4s cubic-bezier(0.4, 0, 0.2, 1) infinite'
              : 'none',
            animationDelay: '1s',
          },
          _hover: {
            color: darkBackground ? 'stone.50' : 'text',
            _before: {
              transform: 'translateX(0) rotate(-180deg)',
              animation: 'none',
            },
          },
        })}
      >
        <Slot />
      </button>
    );
  }
);
