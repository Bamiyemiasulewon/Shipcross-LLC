'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        <Image
          src={images[selectedIndex]}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-20 h-20 relative overflow-hidden bg-gray-100 border-2 ${
              selectedIndex === index ? 'border-accent' : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}