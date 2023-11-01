import React from 'react';

export default function CardLandingPage({ title, description, imageSrc }) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="relative flex h-64 w-full items-center justify-center gap-3 rounded-2xl border-[0.5px] border-white bg-gray-100">
        {/* <div className="absolute left-10 bottom-10 z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-gray-500"
          >
            SVG path data
          </svg>
        </div> */}
        <div className="relative z-0 h-48 w-48 overflow-hidden rounded-xl bg-white p-6 shadow">
          <img
            alt=""
            sizes="100vw"
            srcSet={imageSrc}
            src={imageSrc}
            decoding="async"
            data-nimg="fill"
            className="object-cover object-center"
            loading="lazy"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent"
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
};

export function ImageCard({alt, src}) {
  return (
    // p-2
    <div className="cursor-pointer w-full h-48 sm:w-20 sm:h-24 rounded-md overflow-hidden bg-trypan-blue-900/10 backdrop-blur hover:scale-125 transition duration-300 ease-out border border-white/25">
      <div className="w-full h-full relative">
        <img
          alt={alt}
          srcSet={src}
          src={src}
          decoding="async"
          data-nimg="fill"
          className="object-cover"
          loading="lazy"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            color: "transparent"
          }}
        />
      </div>
    </div>
  )
};
