import React, { useState, useRef, useEffect } from "react";

const useClickoutSide = ({ handleClose }) => {
  const ref = useRef(null);

  const clickEvent = (e) => {
    if (!ref.current.contains(e.target)) {
        handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickEvent);

    return () => {
      document.removeEventListener("mousedown", clickEvent);
    };
  }, []);

  return {
    ref,
  };
};

export default useClickoutSide;
