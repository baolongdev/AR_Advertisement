import * as Redux from 'redux';

export interface ModelViewerConfig {
    animationName?: string;
    autoRotate?: boolean;
    autoplay?: boolean;
    bgColor?: string;
    cameraControls?: boolean;
    // Note user may set camera orbit from mouse drag or UI input.
    cameraOrbit?: string;
    cameraTarget?: string;
    fieldOfView?: string;
    environmentImage?: string;  // IBL/HDRI lighting
    exposure?: number;  // Environment for hdr environment, used as ibl intensity
    toneMapping?: string;
    poster?: string;  // Display an image before model finished loading
    reveal?: string;  // Controls when the model should be revealed
    interactionPrompt?: string;
    shadowIntensity?: number;
    shadowSoftness?: number;
    maxCameraOrbit?: string;
    maxFov?: string;  // Field of view
    minCameraOrbit?: string;
    minFov?: string;  // Field of view
    src?: string;
    // This doesn't correspond to a modelviewer attribute, but ultimately MVC is
    // app state - not MV state.
    useEnvAsSkybox?: boolean;
}

export type ImageType = 'image/png' | 'image/jpeg' | 'image/webp';

export interface PosterConfig {
    height: number;
    mimeType: ImageType;
}

interface HotspotsUIState {
    addHotspot: boolean;
}

interface UIState {
    hotspots: HotspotsUIState;
}

export interface RelativeFilePathsState {
    modelName?: string;
    environmentName?: string;
    posterName: string;
}

export interface EnvironmentState {
    environmentImages: EnvironmentImage[];
}

export interface ArConfigState {
    ar?: boolean;
    arModes?: string;
}

export interface BestPracticesState {
    progressBar: boolean;
    arButton: boolean;
    arPrompt: boolean;
}

export interface ModelViewerSnippetState {
    arConfig: ArConfigState;
    bestPractices: BestPracticesState;
    config: ModelViewerConfig;
    poster: PosterConfig;
    hotspots: HotspotConfig[];
    relativeFilePaths: RelativeFilePathsState;
    extraAttributes: any;
}

export interface EntitiesState {
    isDirtyCamera: boolean;
    mobile: MobileState;
    environment: EnvironmentState;
    model: ModelState;
    modelViewerSnippet: ModelViewerSnippetState;
}

/**
 * Space Opera state.
 */
export interface State {
    entities: EntitiesState;
    ui: UIState;
}

export const INITIAL_STATE: State = {
    ui: { hotspots: { addHotspot: false } },
    entities: {
        isDirtyCamera: false,
        mobile: {
            isRefreshable: false,
            forcePost: false,
        },
        environment: { environmentImages: INITIAL_ENVIRONMENT_IMAGES },
        model: { fileMap: new Map<string, File>() },
        modelViewerSnippet: {
            arConfig: { ar: true, arModes: 'webxr scene-viewer quick-look' },
            bestPractices: { progressBar: true, arButton: true, arPrompt: true },
            config: { cameraControls: true, shadowIntensity: 1 },
            poster: { height: 512, mimeType: 'image/webp' },
            hotspots: [],
            relativeFilePaths: { posterName: 'poster.webp' },
            extraAttributes: {},
        },
    },
};

/**
 * Convenience function for components that import GLBs.
 * We consider "staging config" to be properties that are applicable to
 * any model, and thus are sensible to preserve when a new model is
 * loaded.
 */

export function extractStagingConfig(config: ModelViewerConfig):
    ModelViewerConfig {
    return {
        environmentImage: config.environmentImage, exposure: config.exposure,
        toneMapping: config.toneMapping, useEnvAsSkybox: config.useEnvAsSkybox,
        shadowIntensity: config.shadowIntensity,
        shadowSoftness: config.shadowSoftness,
        cameraControls: config.cameraControls, autoRotate: config.autoRotate,
    }
}