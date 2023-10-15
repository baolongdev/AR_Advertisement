import React, { useEffect } from "react";
import { ModelViewerElement } from '@google/model-viewer';

export default function Model() {
    useEffect(() => {

    }, []);

    return (
        <div>
            <model-viewer
                id="reveal"
                // ar
                camera-controls
                touch-action="pan-y"
                auto-rotate
                poster="/assets/demo.png"
                src="/model/smol_ame_in_an_upcycled_terrarium_hololiveen.glb"
                shadow-intensity="1"
                alt="A 3D model of a shishkebab"
            >
                <button
                    slot="ar-button"
                    style={{
                        backgroundColor: "white",
                        borderRadius: "4px",
                        border: "none",
                        position: "absolute",
                        top: "16px",
                        right: "16px"
                    }}
                >
                    👋 Activate AR
                </button>
            </model-viewer>
        </div>
    );
}