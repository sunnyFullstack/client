import React from "react";

interface LogoProps {
  src?: string; // Optional image source
  alt?: string; // Alt text for the image
  size?: number; // Size in pixels (default: 60)
  fallbackText?: string; // Text to show if image is not available (e.g., initials)
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  src,
  alt = "Logo",
  size = 60,
  fallbackText = "MT",
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-primary font-bold overflow-hidden shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <span className="text-lg">{fallbackText}</span>
      )}
    </div>
  );
};

export default Logo;
