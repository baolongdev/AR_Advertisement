import React from 'react'

export default function Statistics() {
    return (
        <section id="statistics" className="section h-screen">
            <div className="content mx-auto max-w-7xl p-6 md:px-12">
                <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-4">
                    <div className="relative flex flex-col items-center justify-center gap-12 p-4 md:p-16 lg:flex-row lg:gap-16 xl:px-20">
                        <div className="absolute z-0 h-[200px] w-[200px] bg-[url('/assets/landingPage/grid-wall.svg')] bg-center bg-no-repeat opacity-60 md:h-[500px] md:w-[5000px]" />
                        <div className="text-center">
                            <h2
                                className="text-gradient text-red-500 font-body tracking-normal text-5xl sm:text-6xl md:pt-12 xl:pt-0"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                34,912
                            </h2>
                            <p
                                className="large whitespace-nowrap"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                Models Generated
                            </p>
                        </div>
                        <div className="text-center tracking-normal">
                            <h2
                                className="text-gradient text-red-500 font-body text-5xl sm:text-6xl md:pt-12 xl:pt-0"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                130,920
                            </h2>
                            <p
                                className="large whitespace-nowrap"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                Artist Hours Saved
                            </p>
                        </div>
                    </div>
                    <h3 className="text-center font-bold md:whitespace-nowrap lg:text-right text-5xl sm:text-6xl md:pt-12 xl:pt-0">
                        Saving game studios
                        <br /> time and money
                    </h3>
                </div>
            </div>
        </section>

    )
}
