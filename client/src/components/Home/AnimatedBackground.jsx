import { useEffect, useState } from "react";

function AnimatedBackground() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="background">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="grid-overlay"></div>

      <div
        className="mouse-light"
        style={{
          left: position.x,
          top: position.y,
        }}
      />

    </div>
  );
}

export default AnimatedBackground;