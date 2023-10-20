import React, { useEffect } from "react";
import { ModelViewerElement } from '@google/model-viewer';

export default function Model() {
    useEffect(() => {

    }, []);

    return (
        <section id="modelview" className="section">
            <div className="content">
                <div className="visit__cards">
                    <div className="visit__card mod--first">
                        <div className="visit__card-title-over">
                            from antiquity to&nbsp;modern
                        </div>
                        <div className="visit__card-play-wrap">
                            <div>Ancient Greece</div>
                            <img src="https://assets-global.website-files.com/651c348dccebd78124903fb3/651c348dccebd78124904042_ico_btn-play.svg" loading="lazy" alt="" className="visit__card-play" />
                        </div>
                        <div className="visit__card-elements">
                            <model-viewer
                                id="reveal"
                                ar
                                ar-scale="auto"
                                camera-controls
                                touch-action="pan-y"
                                auto-rotate
                                // poster="/assets/demo.png"
                                src="/model/modelT.glb"
                                shadow-intensity="1"
                                alt="A 3D model of a shishkebab"
                                title="abd"
                            >
                            </model-viewer> 
                        </div>
                        <div className="visit__card-desc">
                            Đoạn mô tả sản phẩm
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}