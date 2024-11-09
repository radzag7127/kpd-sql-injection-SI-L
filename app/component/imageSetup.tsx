import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

const ImageWithFallback: React.FC<Props> = ({
                                                src,
                                                alt,
                                                width,
                                                height,
                                                className = "",
                                            }) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
    }, [src]);

    const handleLoad = () => setIsLoading(false);
    const handleError = () => {
        setIsError(true);
        setIsLoading(false);
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {!isError && (
                <Image
                    src={src}
                    alt={alt}
                    onError={handleError}
                    onLoad={handleLoad}
                    className={`${className || "object-cover w-full h-full"} ${
                        isLoading ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-500`}
                    width={width || 1080}
                    height={height || 720}
                    loading="eager"
                    priority={true}
                    style={{
                        width: width ? `${width}px` : "auto",
                        height: height ? `${height}px` : "auto",
                    }}
                />
            )}
            {isError && (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500"
                    >
                        <path
                            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                        />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Image not available</p>
                </div>
            )}
        </div>
    );
};

export default ImageWithFallback;