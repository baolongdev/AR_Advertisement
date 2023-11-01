import React from 'react'

export default function Intro() {
    return (
        <section id="intro" className="section">
            <div className="content mx-auto max-w-7xl p-6 my-12 flex flex-col-reverse justify-between gap-24 md:gap-8 md:p-12 xl:my-32 xl:flex-row">
                <div className="relative mx-auto mb-16 flex w-auto max-w-[450px] flex-1 flex-col md:z-10 lg:mx-0 lg:min-w-[450px]">
                    <h2 className="block mb-0 font-display text-5xl text-fire-opal sm:text-6xl md:hidden xl:block">
                        <div className="opacity-5">Giới thiệu</div>
                        <div className="opacity-10">Giới thiệu</div>
                        <div className="opacity-20">Giới thiệu</div>
                        <div className="opacity-30">Giới thiệu</div>
                        <div className="opacity-40">Giới thiệu</div>
                    </h2>
                    <h2 className="text-5xl sm:text-6xl md:pt-12 xl:pt-0">
                        <span className="text-gradient">Giới thiệu</span>
                        <br />
                        {/* về{" "} */}
                        <span className="relative whitespace-nowrap">
                            AR ADVERTISING
                            <img
                                alt=""
                                srcSet="/assets/landingPage/squiggle.png"
                                src="/assets/landingPage/squiggle.png"
                                width="269.17"
                                height="9.96"
                                decoding="async"
                                data-nimg={1}
                                className="absolute right-0 bottom-[-10px] w-full"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                        </span>
                    </h2>
                    <p className="mt-8 text-base sm:text-lg">
                    Trong ngành thương mại điện tử hiện nay chưa chú trọng trong việc áp dụng công nghệ AR, vào kinh doanh, buôn bán sản phẩm. Vì thế, dịch vụ của chúng tôi là một ưu điểm vượt trội về công nghệ so với các các đối thủ khác trong cùng lĩnh vực
                    </p>
                </div>
                <div className="mx-auto flex w-full max-w-sm flex-col gap-4 font-semibold md:mb-28 md:max-w-none md:flex-row">
                    <div className="relative flex w-full flex-col gap-4">
                        <div className="relative z-10 flex h-56 w-full flex-col items-center justify-between gap-4 rounded-2xl border-white bg-gray-100 p-4 text-trypan-blue-900 drop-shadow sm:p-6 md:h-72 md:p-8">
                            <img
                                alt=""
                                srcSet="/_next/image?url=%2Fassets%2Fmodel-images%2Fmage2.png&w=384&q=75 1x, /_next/image?url=%2Fassets%2Fmodel-images%2Fmage2.png&w=640&q=75 2x"
                                src="/_next/image?url=%2Fassets%2Fmodel-images%2Fmage2.png&w=640&q=75"
                                width={300}
                                height={300}
                                decoding="async"
                                data-nimg={1}
                                className="absolute -top-[120px] h-[128px] w-auto"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                            <img
                                alt=""
                                srcSet="/_next/image?url=%2Fassets%2Ffeature-images%2Fimages-to-assets.png&w=1080&q=75 1x, /_next/image?url=%2Fassets%2Ffeature-images%2Fimages-to-assets.png&w=1920&q=75 2x"
                                src="/_next/image?url=%2Fassets%2Ffeature-images%2Fimages-to-assets.png&w=1920&q=75"
                                width={940}
                                height={768}
                                decoding="async"
                                data-nimg={1}
                                className="h-24 w-auto flex-1"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                            <h4 className="w-full text-2xl text-black">
                                3D objects <br />
                                from 2D images
                            </h4>
                        </div>
                        <div className="relative z-10 flex h-56 w-full flex-col items-center justify-between rounded-2xl border-white bg-gray-100 p-4 text-trypan-blue-900 drop-shadow sm:p-6 md:h-72 md:p-8">
                            <h4 className="w-full text-2xl text-black">
                                Production-ready <br />
                                models in minutes
                            </h4>
                            <img
                                alt=""
                                srcSet="/_next/image?url=%2Fassets%2Ffeature-images%2Fprod-ready.png&w=828&q=75 1x, /_next/image?url=%2Fassets%2Ffeature-images%2Fprod-ready.png&w=1920&q=75 2x"
                                src="/_next/image?url=%2Fassets%2Ffeature-images%2Fprod-ready.png&w=1920&q=75"
                                width={756}
                                height={756}
                                decoding="async"
                                data-nimg={1}
                                className="mt-4 h-24 w-auto flex-1"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                        </div>
                        <div className="absolute -bottom-72 -left-24 z-0 hidden h-[500px] w-[500px] bg-[url('/assets/landingPage/grid-wall.svg')] bg-center bg-no-repeat md:h-[700px] md:w-[700px] lg:block" />
                    </div>
                    <div className="relative flex w-full flex-col gap-4 md:translate-y-32">
                        <div className="absolute -left-48 -top-72 z-0 h-[500px] w-[500px] bg-[url('/assets/landingPage/grid-wall.svg')] bg-center bg-no-repeat md:hidden md:h-[700px] md:w-[700px]" />
                        <div className="bg-fire-opal-gradient bg-red-500 relative z-10 flex h-56 w-full flex-col items-center justify-between gap-4 rounded-2xl p-4 text-white drop-shadow sm:p-6 md:h-72 md:p-8">
                            <img
                                alt=""
                                srcSet="/_next/image?url=%2Fassets%2Ffeature-images%2Fscale-team.png&w=828&q=75 1x, /_next/image?url=%2Fassets%2Ffeature-images%2Fscale-team.png&w=1920&q=75 2x"
                                src="/_next/image?url=%2Fassets%2Ffeature-images%2Fscale-team.png&w=1920&q=75"
                                width={784}
                                height={688}
                                decoding="async"
                                data-nimg={1}
                                className="h-24 w-auto flex-1"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                            <h4 className="text-2xl ">Scale your team instantly</h4>
                        </div>
                        <div className="relative z-10 flex h-56 w-full flex-col items-center justify-between rounded-2xl border-white bg-gray-100 p-4 text-trypan-blue-900 drop-shadow sm:p-6 md:h-72 md:p-8">
                            <h4 className="text-2xl text-black">Plugins for your favorite tools</h4>
                            <img
                                alt=""
                                srcSet="/_next/image?url=%2Fassets%2Ffeature-images%2Fplugins.png&w=1080&q=75 1x, /_next/image?url=%2Fassets%2Ffeature-images%2Fplugins.png&w=3840&q=75 2x"
                                src="/_next/image?url=%2Fassets%2Ffeature-images%2Fplugins.png&w=3840&q=75"
                                width={1076}
                                height={332}
                                decoding="async"
                                data-nimg={1}
                                className="h-auto max-h-full w-full"
                                loading="lazy"
                                style={{ color: "transparent" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
