import { CSSProperties } from "react";

const particleColors = ["#f6c453", "#45c7ff", "#ff6b8a", "#7cffb2", "#b891ff", "#ffffff"];

const particles = Array.from({ length: 64 }, (_, index) => {
  const row = Math.floor(index / 8);
  const column = index % 8;

  return {
    color: particleColors[index % particleColors.length],
    delay: -((index * 0.47) % 9),
    duration: 12 + ((index * 1.7) % 10),
    left: 6 + column * 12 + ((index * 7) % 6),
    opacity: 0.2 + ((index * 13) % 45) / 100,
    size: 2 + (index % 4),
    top: 5 + row * 12 + ((index * 5) % 7),
    travel: 24 + ((index * 11) % 42)
  };
});

export function ParticleField() {
  return (
    <div className="professional-particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${index}`}
          className="particle-dot"
          style={
            {
              "--particle-color": particle.color,
              "--particle-delay": `${particle.delay}s`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-left": `${particle.left}%`,
              "--particle-opacity": particle.opacity,
              "--particle-size": `${particle.size}px`,
              "--particle-top": `${particle.top}%`,
              "--particle-travel": `${particle.travel}px`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
