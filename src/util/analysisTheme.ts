import { Theme, Rect, Row } from "graphql-birdseye-core";

const colors = {
  primary: 'magenta',
  background: '#FCFCFC',
  white: "#FCFCFC",
  line: {
    active: '#f50', // "#38616b",
    inactive: 'purple',
  },
};

const nodeStyles = {
  gap: 15,
  container: {
    fill: '#283142',
    rx: 15,
  },
  header: {
    height: 36,
    label: {
      "font-size": 22,
      "text-anchor": "middle",
      fill: "white",
      "font-weight": "bold",
      cursor: "pointer",
    },
    container: {
      fill: "transparent", // colors.primary,
      // stroke: colors.primary
    },
  },
  divider: {
    height: 0,
    stroke: colors.background,
    fill: colors.background,
  } as Rect,
  row: {
    height: 35,
    fieldNameLabel: {
      "font-size": 20,
      fill: "#FCFCFC",
    //   "font-weight": "bold",
    },
    fieldTypeLabel: {
      "font-size": 18,
      fill: "#2db7f5",
    },
    body: {
      fill: "transparent",
      stroke: "transparent", // colors.primary,
      height: 25,
      cursor: "pointer",
    },
  } as Row,
};
export default {
  colors,
  ...nodeStyles,
  line: {
    stroke: colors.line.inactive,
    fill: "transparent",
    strokeWidth: 3,
    strokeLinejoin: "round",
    targetMarker: {
      type: "path",
      d: "M 10 -5 0 0 10 5 z",
    },
  },
} as Theme;