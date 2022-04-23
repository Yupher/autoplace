import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { MobileMenuContext } from "./mobileMenuContext";

const MobileMenuConveyor = (props) => {
  const { controllerRef, children } = props;
  const ref = useRef(null);
  const lastPanelIdRef = useRef(0);
  const [state, setState] = useState({
    stack: [],
    bin: [],
  });

  const controller = useMemo(
    () => ({
      reset: () => {
        setState({
          stack: [],
          bin: [],
        });
      },
    }),
    [],
  );

  useEffect(() => {
    if (controllerRef) {
      if ("current" in controllerRef) {
        controllerRef.current = controller;
      } else {
        controllerRef(controller);
      }
    }
  }, [controller, controllerRef]);

  const open = useCallback((id) => {
    setState((prevState) => ({
      ...prevState,
      stack: [...prevState.stack, id],
    }));
  }, []);

  const close = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      stack: [...prevState.stack.slice(0, -1)],
      bin: [...prevState.bin, ...prevState.stack.slice(-1)],
    }));
  }, []);

  const onTransitionEnd = (event) => {
    if (event.target === ref.current && event.propertyName === "transform") {
      setState((prevState) => ({
        ...prevState,
        bin: [],
      }));
    }
  };

  const contextData = useMemo(
    () => ({
      lastPanelIdRef,
      containerRef: ref,
      open,
      close,
      stack: state.stack,
      bin: state.bin,
    }),
    [ref, open, close, state.stack, state.bin],
  );

  return (
    <div
      ref={ref}
      className='mobile-menu__conveyor'
      style={{
        transform: `translateX(-${state.stack.length * 100}%)`,
      }}
      onTransitionEnd={onTransitionEnd}
    >
      <MobileMenuContext.Provider value={contextData}>
        {children}
      </MobileMenuContext.Provider>
    </div>
  );
};

export default MobileMenuConveyor;
