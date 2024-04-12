import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import dimensions from "./dimensions";
import { Switch, Text } from "@tremor/react";
import { motion } from "framer-motion";
import PluginControls from "./plugin";

export default function ModelViewer({
  linkUrl,
  title = "",
  description = "",
  ...props
}) {
  const [dimensionsOn, setDimensionsOn] = useState<boolean>(false);
  const [animationOn, setAnimationOn] = useState<boolean>(false);
  const [platform, setPlatform] = useState<boolean>(false);
  useEffect(() => {
    dimensions(dimensionsOn);
  }, [dimensionsOn]);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // console.log("abc");
      setPlatform(true);
    }
  }, []);

  return (
    <model-viewer
      id="dimension"
      {...props}
      src={linkUrl}
      title={title}
      alt={description}
      {...(animationOn ? { autoplay: true } : {})}
      ar-scale="auto"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      shadow-intensity="1"
      ar-modes="webxr scene-viewer quick-look"
      ar
    >
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 170, top: 150, bottom: 300 }}
        className='hidden sm:block'
      >
        <div className="flex flex-col gap-3 absolute top-3 right-3 w-52 p-2 rounded-md bg-white">
          <div className="w-full flex gap-2">
            <Text>Hiện kích thức</Text>
            <Switch
              id="switchDimensions"
              name="switch"
              checked={dimensionsOn}
              onChange={() => {
                setDimensionsOn(!dimensionsOn);
              }}
            />
          </div>
          <div className="w-full flex gap-2">
            <Text>Animation</Text>
            <Switch
              id="switchAnimation"
              name="switch"
              checked={animationOn}
              onChange={() => {
                setAnimationOn(!animationOn);
              }}
            />
          </div>
        </div>
      </motion.div>
      <div
        className={`
          absolute
          bottom-4
          right-16
          transform-[]
          p-2
          bg-white
          text-black
          rounded-l-xl
          ${platform ? "" : "hidden"}
        `}
      >
        <p className="select-none">👋 Activate AR 👉</p>
      </div>
    </model-viewer>
  );
}
