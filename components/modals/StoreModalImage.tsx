"use client";

import Image from "next/image";

interface StoreModalImageProps {
  src: string;
}

export const StoreImage = ({
  src
}: StoreModalImageProps) => {
  return (
    <Image 
      src={src}
      width="48"
      height="48"
      alt="StoreImage"
    />
  )
}
