import { useRouter } from 'next/router';
import { Leva, button, folder, useControls } from 'leva';
import { useState } from 'react';
import { handleFileUpload, readFileContent } from '../../components/editor/utils/fileUtils';
import { createSafeObjectUrlFromArrayBuffer } from '../../components/editor/utils/create_object_url';
import { uploadFile } from '../../components/utils/supabase-storage';
import { generateRandomFileName } from '../../components/utils/random';

export default function ModelCreate() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileBlobUrl, setFileBlobUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [placement, setPlacement] = useState(false);
    const [fileContent, setFileContent] = useState(false);

    useControls(() => {
        const controls = {
            "author": {
                value: "Author: Blong1204\nEmail: longle12042006a@gmail.com",
                editable: false,
                label: "",
            },
            "Thông tin": folder({
                title: {
                    value: title,
                    label: "Tiêu đề",
                    onChange: (value) => setTitle(value),
                },
                description: {
                    value: description,
                    label: "Đoạn mô tả",
                    onChange: (value) => setDescription(value),
                },
                placement: {
                    value: placement,
                    label: "Đặt trên tường",
                    onChange: (value) => setPlacement(value),
                },
            }),

            "Tải lên": button(() => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.style.display = 'none';
                fileInput.accept = '.glb,.gltf';
                
                fileInput.addEventListener('change', (event) => {
                    handleFileUpload(event, async (file) => {
                        setSelectedFile(file);
                        readFileContent(file, async (fileContent, objectUrl) => {
                            setFileContent(fileContent)
                            setFileBlobUrl(objectUrl);
                        });
                    });
                });
                fileInput.click();
            }),
            "Tạo link": button((get) => {
                const root = generateRandomFileName()
                console.log(fileBlobUrl);
                
                // uploadFile(root, "model", selectedFile)
                // uploadFile(root, "title", title)
                // uploadFile(root, "description", description)
                // uploadFile(root, "placement", placement)
                // uploadFile(root, "colorBG", colorBG)
                // uploadFile(root, "fileContent", fileContent)
            }),
        };

        if (selectedFile) {
            controls["Thêm Hotspot"] = button(() => { });
        }

        return controls;
    });
    
    return (
        <div className='create'>
            <Leva titleBar={{ title: "Bảng điều khiển", drag: false }} hideCopyButton={true} />
            {router.isFallback ? <h1>Loading…</h1> : (
                <model-viewer
                    src={fileBlobUrl}
                    ar-scale="auto"
                    camera-controls
                    touch-action="pan-y"
                    auto-rotate
                    shadow-intensity="1"
                    alt={description}
                    title={title}
                />
            )}
        </div>
    );
}
