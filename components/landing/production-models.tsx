import React, { useState } from 'react'
import { ImageCard } from './CardLandingPage'

export default function ProductionModels() {
    const [activeTab, setActiveTab] = useState(0);
    const tabsContent = [
        {
            alt: "mini sofa",
            src: "/model/mini_sofa.png",
            model: "/model/mini_sofa.glb",
        },
        {
            alt: "table",
            src: "/model/table.png",
            model: "/model/table.glb",
        },
        {
            alt: "chair",
            src: "/model/bed.png",
            model: "/model/bed.glb",
        },
        {
            alt: "plot",
            src: "/model/plot.png",
            model: "/model/plot.glb",
        },
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };


    return (
        <section id="production-models" className="section">
            <div className="content mx-auto max-w-7xl p-6 flex flex-col items-center justify-between md:p-12 lg:py-20 xl:items-start">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className='text-5xl sm:text-6xl md:pt-12 xl:pt-0'>Các sản phẩm mẫu</h2>
                    <p className="large mb-8 mt-3">
                        Kaedim is optimized for usable, production-ready 3D assets. We've worked
                        closely with 3D artists to ensure outputs are up to industry standards.
                    </p>
                </div>
                <div className='flex w-full flex-col justify-center gap-7'>
                    <div className="relative w-full">
                        <div className="relative z-10 h-[350px] sm:h-[450px] scale-[1]">
                            <div
                                className="flex h-full items-center justify-center"
                                style={{ opacity: 1 }}
                            >
                                <model-viewer
                                    src={tabsContent[activeTab].model}
                                    ar-scale="auto"
                                    camera-controls
                                    touch-action="pan-y"
                                    auto-rotate
                                    shadow-intensity="1"
                                />
                            </div>
                        </div>
                        <img
                            alt=""
                            src="/assets/landingPage/grid-floor.svg"
                            width={100}
                            height={100}
                            decoding="async"
                            data-nimg={1}
                            className="absolute -bottom-40 h-96 w-full"
                            loading="lazy"
                            style={{ color: "transparent" }}
                        />
                        <img
                            alt=""
                            src="/assets/landingPage/bg-lighting.svg"
                            width={100}
                            height={100}
                            decoding="async"
                            data-nimg={1}
                            className="absolute -bottom-24 h-96 w-full"
                            loading="lazy"
                            style={{ color: "transparent" }}
                        />
                    </div>
                    <div className="hidden sm:flex justify-center sm:gap-6 grid-cols-2 gap-3">
                        {tabsContent.map((tab, index) => (
                            <div
                                key={index}
                                onClick={() => handleTabClick(index)}
                            >
                                <ImageCard
                                    alt={tab.alt}
                                    src={tab.src}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
