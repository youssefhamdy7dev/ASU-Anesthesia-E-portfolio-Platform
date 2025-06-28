import { globalCss } from "@nextui-org/react";

export default globalCss({
  html: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    overflowX: "hidden",
  },
  body: {
    background: "radial-gradient(#eeeff3, transparent)",
  },
  label: {
    color: "$gray900 !important",
  },
  "@media print": {
    "#nav, #bgi": {
      display: "none",
    },
  },
  ".container": {
    maxW: "1350px !important",
  },
});
