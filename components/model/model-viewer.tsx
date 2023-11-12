import React, { HTMLAttributes } from 'react';

export default function ModelViewer({linkUrl, title = "", description = "", ...props }) {
  return (
    <model-viewer
      {...props}
      src={linkUrl}
      title={title}
      alt={description}
      ar-scale="auto"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      autoplay
      shadow-intensity="1"
      ar-modes="webxr scene-viewer quick-look"
      ar
    ></model-viewer>
  );
}
