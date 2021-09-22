
export type PageContent = {
  name: string;
  title: string;
  subTitle: string;
  message: string;
  logo: string;
};

type PageContentOptions = {
  [key: string]: PageContent;
};

export const DEFAULT_PAGE_SOURCE = "default";

export const SIGN_IN_PAGE_CONTENT: PageContentOptions = {
  rc: {
    name: "",
    title: "",
    subTitle: "",
    logo: '',
    message: "",
  },
  [DEFAULT_PAGE_SOURCE]: {
    name: "Equilibrium",
    title: "Instantly generate quality Node.js apps",
    subTitle: "Just code what matters.",
    logo: '',
    message: "",
  },
};
