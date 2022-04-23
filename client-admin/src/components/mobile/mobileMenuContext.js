import React from "react";

export const MobileMenuContext = React.createContext({
  lastPanelIdRef: { current: 0 },
  containerRef: null,
  open: () => {},
  close: () => {},
  stack: [],
  bin: [],
});

export const MobileMenuLevelContext = React.createContext(0);
