import { useEffect, useState } from "react";

const LogoStrip = () => {
  const [logos] = useState([
    { id: 1, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 2, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 3, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 4, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 5, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 6, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 7, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 8, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 9, src: "/logo.png", alt: "COISA Materiais de Construção" },
    { id: 10, src: "/logo.png", alt: "COISA Materiais de Construção" },
  ]);

  return (
    <section className="bg-muted/50 py-8 overflow-hidden">
      <div className="relative">
        {/* Faixa de logos */}
        <div className="flex animate-scroll-left">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
          {/* Duplicação para continuidade infinita */}
          {logos.map((logo) => (
            <div
              key={`duplicate-${logo.id}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
