// BackgroundImage.jsx
import BgImage from "../../../public/BImage2.png"

import { ReactNode } from "react";

  type BackgroundImageProps = {
    children: ReactNode;
  };
  
  export default function BackgroundImage({ children }: BackgroundImageProps) {
    return (
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${BgImage.src})` }}
      >
        {/* Overlay pour fondu */}
        <div className="absolute inset-0 bg-white opacity-5"></div>
  
        {/* Contenu */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  } 