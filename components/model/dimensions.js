
function createButtonDimensions(modelViewer, slot, className, dataPosition, dataNormal) {
    const buttonEl = document.createElement('button');
    buttonEl.slot = slot;
    buttonEl.className = className;
    buttonEl.dataset.position = dataPosition;
    buttonEl.dataset.normal = dataNormal;
    modelViewer.appendChild(buttonEl);
}

function createSvgLines(modelViewer) {
    var xmlns = "http://www.w3.org/2000/svg";
    const svgContainer = document.createElementNS(xmlns, "svg");
    svgContainer.id = 'dimLines';
    svgContainer.classList.add('dimensionLineContainer');
    svgContainer.setAttribute('width', '100%');
    svgContainer.setAttribute('height', '100%');

    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS(xmlns, 'line');
        line.classList.add('dimensionLine');
        svgContainer.appendChild(line);
    }

    modelViewer.appendChild(svgContainer);
}

// update svg
function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
    if (dotHotspot1 && dotHotspot2) {
        svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
        svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
        svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
        svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

        // use provided optional hotspot to tie visibility of this svg line to
        if (dimensionHotspot && !dimensionHotspot.facingCamera) {
            svgLine.classList.add('hide');
        }
        else {
            svgLine.classList.remove('hide');
        }
    }
}

function setVisibility(visible, dimElements) {
    dimElements.forEach((element) => {
        if (visible) {
            element.classList.remove('hide');
        } else {
            element.classList.add('hide');
        }
    });
}

export default function dimensions(dimensionsVisible = false) {
    const modelViewer = document.querySelector('#dimension');
    if (modelViewer) {
        const hotspotsExist = modelViewer.querySelectorAll('[slot^="hotspot-"]').length > 0;
        const svgLinesExist = modelViewer.querySelector('#dimLines') !== null;

        if (!hotspotsExist) {
            createButtonDimensions(modelViewer, 'hotspot-dot+X-Y+Z', 'dot', '1 -1 1', '1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dim+X-Y', 'dim', '1 -1 0', '1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dot+X-Y-Z', 'dot', '1 -1 -1', '1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dim+X-Z', 'dim', '1 0 -1', '1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dot+X+Y-Z', 'dot', '1 1 -1', '0 1 0');
            createButtonDimensions(modelViewer, 'hotspot-dim+Y-Z', 'dim', '0 -1 -1', '0 1 0');
            createButtonDimensions(modelViewer, 'hotspot-dot-X+Y-Z', 'dot', '-1 1 -1', '0 1 0');
            createButtonDimensions(modelViewer, 'hotspot-dim-X-Z', 'dim', '-1 0 -1', '-1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dot-X-Y-Z', 'dot', '-1 -1 -1', '-1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dim-X-Y', 'dim', '-1 -1 0', '-1 0 0');
            createButtonDimensions(modelViewer, 'hotspot-dot-X-Y+Z', 'dot', '-1 -1 1', '-1 0 0');
        }

        if (!svgLinesExist) {
            createSvgLines(modelViewer);
        }
    }
    const dimElements = [...modelViewer.querySelectorAll('button'), modelViewer.querySelector('#dimLines')];
    setVisibility(dimensionsVisible, dimElements)
    const dimLines = modelViewer.querySelectorAll('line');

    modelViewer.addEventListener('ar-status', (event) => {
        setVisibility(event.detail.status !== 'session-started');
    });

    const renderSVG = () => {
        drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
        drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
        drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
        drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
        drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
    };

    modelViewer.addEventListener('load', () => {
        const center = modelViewer.getBoundingBoxCenter();
        const size = modelViewer.getDimensions();
        const x2 = size.x / 2;
        const y2 = size.y / 2;
        const z2 = size.z / 2;

        modelViewer.updateHotspot({
            name: 'hotspot-dot+X-Y+Z',
            position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
        });

        modelViewer.updateHotspot({
            name: 'hotspot-dim+X-Y',
            position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').innerHTML =
            `Ngang <br> ${(size.z * 100).toFixed(0)} cm`;

        modelViewer.updateHotspot({
            name: 'hotspot-dot+X-Y-Z',
            position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
        });

        modelViewer.updateHotspot({
            name: 'hotspot-dim+X-Z',
            position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').innerHTML =
            `Cao <br> ${(size.y * 100).toFixed(0)} cm`;

        modelViewer.updateHotspot({
            name: 'hotspot-dot+X+Y-Z',
            position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
        });

        modelViewer.updateHotspot({
            name: 'hotspot-dim+Y-Z',
            position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').innerHTML =
            `Dọc <br> ${(size.x * 100).toFixed(0)} cm`;

        modelViewer.updateHotspot({
            name: 'hotspot-dot-X+Y-Z',
            position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
        });

        modelViewer.updateHotspot({
            name: 'hotspot-dim-X-Z',
            position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').innerHTML =
            `Cao <br> ${(size.y * 100).toFixed(0)} cm`;

        modelViewer.updateHotspot({
            name: 'hotspot-dot-X-Y-Z',
            position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
        });

        modelViewer.updateHotspot({
            name: 'hotspot-dim-X-Y',
            position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').innerHTML =
            `Ngang <br> ${(size.z * 100).toFixed(0)} cm`;

        modelViewer.updateHotspot({
            name: 'hotspot-dot-X-Y+Z',
            position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
        });

        renderSVG();
        modelViewer.addEventListener('camera-change', renderSVG);
        modelViewer.addEventListener('autoplay', renderSVG);
    })
}

