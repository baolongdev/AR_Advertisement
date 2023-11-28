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
        return () => {
            modelViewer.removeEventListener('click', clickHandler);
        };
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

    const convertHotspotsToJSON = () => {
        const hotspotNodes = querySelectorAllHotspot();
        const hotspotArray = [];

        hotspotNodes.forEach(button => {
            const position = button.dataset.position;
            const content = button.querySelector('.HotspotAnnotation')?.textContent || '';

            // Tạo đối tượng JSON cho mỗi hotspot
            const hotspotObject = {
                slot: button.slot,
                position: position,
                content: content
            };

            hotspotArray.push(hotspotObject);
        });

        return hotspotArray;
    };

    const renderHotspotsFromJSON = (hotspotsJSON) => {
        hotspotsJSON?.forEach((hotspotData) => {
            const { slot, position, content } = hotspotData;
            const count = PluginControls().getCountHotspot().length;
            // Kiểm tra xem hotspot có sẵn không trước khi thêm mới
            if (!checkPosition(position)) {
                addHotspot({ x: parseFloat(position.split(' ')[0]), y: parseFloat(position.split(' ')[1]), z: parseFloat(position.split(' ')[2]) }, count, 
                () => {
                    console.log("");
                    updateContentHotspot(`hotspot-${count}`, content);
                })
            }
        });
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
        convertHotspotsToJSON,
        renderHotspotsFromJSON,
    };
}
