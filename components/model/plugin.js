function createButton(modelViewer, slot, className, dataPosition, dataNormal) {
    const buttonEl = document.createElement('button');
    buttonEl.slot = slot;
    buttonEl.className = className;
    buttonEl.dataset.position = dataPosition;
    // buttonEl.dataset.normal = dataNormal;
    modelViewer.appendChild(buttonEl);
}

export default function PluginControls() {
    const modelViewer = document.querySelector('#dimension');

    const getAnimationNames = () => {
        return new Promise((resolve, reject) => {
            modelViewer.addEventListener('load', () => {
                if (modelViewer.availableAnimations) {
                    resolve(modelViewer.availableAnimations);
                } else {
                    reject("No available animations");
                }
            });
        });
    };
    const checkPosition = (position) => {
        const hotspotButtons = modelViewer.querySelectorAll('.buttonHotspot');
        const { x: targetX, y: targetY, z: targetZ } = position

        for (const button of hotspotButtons) {
            const buttonPosition = button.dataset.position;
            const [buttonX, buttonY, buttonZ] = buttonPosition.split(' ').map(parseFloat);
            if (buttonX === targetX && buttonY === targetY && buttonZ === targetZ) {
                return true;
            }
        }
        return false;
    };
    const getPositionClick = (callback) => {
        const clickHandler = (event) => {
            const cameraTarget = modelViewer.getCameraTarget();
            callback(modelViewer, cameraTarget, checkPosition(cameraTarget));
        };
        modelViewer.addEventListener('click', clickHandler);
    };

    const addHotspot = (CameraTarget, count, callback) => {
        const { x, y, z } = CameraTarget
        createButton(modelViewer, `hotspot-${count}`, 'buttonHotspot', `${x} ${y} ${z}`, '');
        callback(modelViewer)
    }
    const deleteHotspot = (idSlot) => {
        const hotspot = querySelectorHotspot(idSlot);
    
        if (hotspot) {
            hotspot.remove();
        }
    };

    const updateContentHotspot = (idSlot, content) => {
        const hotspot = querySelectorHotspot(idSlot);
        const annotationDiv = hotspot?.querySelector(".HotspotAnnotation");

        if (hotspot && annotationDiv) {
            annotationDiv.textContent = content;
        } else if (hotspot) {
            const newAnnotationDiv = document.createElement('div');
            newAnnotationDiv.className = 'HotspotAnnotation';
            newAnnotationDiv.textContent = content;
            hotspot.appendChild(newAnnotationDiv);
        }
    };

    const getCountHotspot = () => {
        const hotspotButtons = modelViewer.querySelectorAll('.buttonHotspot');
        const slotsArray = [];

        hotspotButtons.forEach(button => {
            slotsArray.push(button.slot);
        });
        return { length: hotspotButtons.length, slotsArray: slotsArray };
    };
    
    const querySelectorAllHotspot = () => {
        return modelViewer.querySelectorAll('.buttonHotspot');
    };

    const querySelectorHotspot = (index) => {
        return modelViewer.querySelector(`button[slot="${index}"]`);
    };
    return {
        getAnimationNames,
        getPositionClick,
        addHotspot,
        deleteHotspot,
        updateContentHotspot,
        getCountHotspot,
        querySelectorAllHotspot,
        querySelectorHotspot,
    };
}
