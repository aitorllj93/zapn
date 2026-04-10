import { useEffect, useState } from "react";

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
export type Breakpoint = keyof typeof breakpoints;

const isServer = typeof window === "undefined";

export const getBreakpoint = () => {
  if (isServer) {
    return breakpoints['2xl'];
  }
  const isSmall = window.matchMedia(
    `(max-width: ${breakpoints.sm}px)`,
  ).matches;
  if (isSmall) {
    return breakpoints.sm;
  }
  const isMedium = window.matchMedia(
    `(max-width: ${breakpoints.md}px)`,
  ).matches;
  if (isMedium) {
    return breakpoints.md;
  }
  const isLarge = window.matchMedia(
    `(max-width: ${breakpoints.lg}px)`,
  ).matches;
  if (isLarge) {
    return breakpoints.lg;
  }
  const isXLarge = window.matchMedia(
    `(max-width: ${breakpoints.xl}px)`,
  ).matches;
  if (isXLarge) {
    return breakpoints.xl;
  }
  const isXXLarge = window.matchMedia(
    `(max-width: ${breakpoints["2xl"]}px)`,
  ).matches;
  if (isXXLarge) {
    return breakpoints["2xl"];
  }
  return breakpoints["2xl"];
};

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<Breakpoint>("xs");
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (
      breakpoints.xs < windowSize.width &&
      windowSize.width < breakpoints.sm
    ) {
      setBreakPoint("xs");
    }
    if (
      breakpoints.sm < windowSize.width &&
      windowSize.width < breakpoints.md
    ) {
      setBreakPoint("sm");
    }
    if (
      breakpoints.md < windowSize.width &&
      windowSize.width < breakpoints.lg
    ) {
      setBreakPoint("md");
    }
    if (
      breakpoints.lg < windowSize.width &&
      windowSize.width < breakpoints.xl
    ) {
      setBreakPoint("lg");
    }
    if (
      breakpoints.xl < windowSize.width &&
      windowSize.width < breakpoints["2xl"]
    ) {
      setBreakPoint("xl");
    }
    if (windowSize.width >= breakpoints["2xl"]) {
      setBreakPoint("2xl");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export const up = (breakpoint: Breakpoint) => {
  const current = getBreakpoint();

  return current >= breakpoints[breakpoint];
};

export const down = (breakpoint: Breakpoint) => {
  const current = getBreakpoint();

  return current <= breakpoints[breakpoint];
};

export default useBreakpoint;