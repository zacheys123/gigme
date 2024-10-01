import { ArrowCircleUpRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when the user scrolls down
  const toggleVisibility = () => {
    if (window.scrollY > "100px") {
      alert("windowinnerHeight");
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "absolute",
            bottom: "230px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "50%",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            zIndex: "1000",
          }}
          className="z-50"
        >
          <ArrowCircleUpRounded size="35px" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
