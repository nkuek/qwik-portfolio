import ReactLogo from '~/images/react.svg?jsx';
import ReduxLogo from '~/images/redux.svg?jsx';
import JavaScriptLogo from '~/images/javascript.svg?jsx';
import TypeScriptLogo from '~/images/typescript.svg?jsx';
import PythonLogo from '~/images/python.svg?jsx';
import MuiLogo from '~/images/mui.svg?jsx';
import ExpressLogo from '~/images/express.svg?jsx';
import GSAPLogo from '~/images/gsap.png?jsx';
import QwikLogo from '~/images/qwik.svg?jsx';
import NextJSLogo from '~/images/nextjs.svg?jsx';
import CSSLogo from '~/images/css.svg?jsx';
import HTMLLogo from '~/images/html.svg?jsx';
import SvelteLogo from '~/images/svelte.svg?jsx';
import NodeJSLogo from '~/images/node.svg?jsx';

export type Technology =
  | 'React'
  | 'Redux'
  | 'JavaScript'
  | 'TypeScript'
  | 'MaterialUI'
  | 'Express'
  | 'CSS'
  | 'Python'
  | 'Next.js'
  | 'Svelte'
  | 'Qwik'
  | 'GSAP'
  | 'NodeJS'
  | 'HTML';

type TechnologyMap = {
  logo: typeof ReactLogo;
  href: string;
};

export const logoMap: Record<Technology, TechnologyMap> = {
  React: {
    logo: ReactLogo,
    href: 'https://react.dev/',
  },
  Redux: { logo: ReduxLogo, href: 'https://redux.js.org/' },
  TypeScript: {
    logo: TypeScriptLogo,
    href: 'https://www.typescriptlang.org/',
  },
  JavaScript: { logo: JavaScriptLogo, href: 'https://www.javascript.com/' },
  Express: { logo: ExpressLogo, href: 'https://expressjs.com/' },
  Python: { logo: PythonLogo, href: 'https://www.python.org/' },
  CSS: {
    logo: CSSLogo,
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  MaterialUI: { logo: MuiLogo, href: 'https://mui.com/material-ui/' },
  'Next.js': {
    logo: NextJSLogo,
    href: 'https://nextjs.org/',
  },
  Qwik: {
    logo: QwikLogo,
    href: 'https://qwik.builder.io',
  },
  Svelte: {
    logo: SvelteLogo,
    href: 'https://svelte.dev/',
  },
  GSAP: {
    logo: GSAPLogo,
    href: 'https://greensock.com/gsap/',
  },
  NodeJS: {
    logo: NodeJSLogo,
    href: 'https://nodejs.org/en/',
  },
  HTML: {
    logo: HTMLLogo,
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
};
