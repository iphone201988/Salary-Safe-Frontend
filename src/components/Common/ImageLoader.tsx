import React, { useState } from "react";
import Loader from "../Loader/Loader";

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && <Loader/>}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`transition-opacity duration-500 ease-in-out absolute ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ImageLoader;
