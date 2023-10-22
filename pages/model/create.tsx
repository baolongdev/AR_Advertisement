import { useRouter } from 'next/router';
import { Leva, button, folder, useControls } from 'leva';
import { useRef, useState } from 'react';
import { handleFileUpload, readFileContent } from '../../components/editor/utils/fileUtils';
import { createSafeObjectUrlFromArrayBuffer } from '../../components/editor/utils/create_object_url';
import { uploadFileDatabase, uploadFileStorage } from '../../components/utils/supabase-storage';
import { generateRandomFileName } from '../../components/utils/random';

export default function ModelCreate() {
    const router = useRouter();

    const selectedFile = useRef(null);
    const fileBlobUrl = useRef(null);
    const [stateFileBlobUrl, setFileBlobUrl] = useState(null);
    const title = useRef("");
    const description = useRef("");
    const placement = useRef(false);

    useControls(() => {
        const controls = {
            "author": {
                value: "Author: Blong1204\nEmail: longle12042006a@gmail.com",
                editable: false,
                label: "",
            },
            "Thông tin": folder({
                "title": {
                    value: title.current,
                    label: "Tiêu đề",
                    onChange: (value) => title.current = value,
                },
                "description": {
                    value: description.current,
                    label: "Đoạn mô tả",
                    onChange: (value) => description.current = value,
                },
                "placement": {
                    value: placement.current,
                    label: "Đặt trên tường",
                    onChange: (value) => placement.current = value,
                },
            }),

            "Tải lên": button(() => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.style.display = 'none';
                fileInput.accept = '.glb,.gltf';

                fileInput.addEventListener('change', (event) => {
                    handleFileUpload(event, async (file) => {
                        selectedFile.current = file;
                        readFileContent(file, async (fileContent, objectUrl) => {
                            fileContent.current = fileContent;
                            fileBlobUrl.current = objectUrl;
                            setFileBlobUrl(objectUrl)
                        });
                    });
                });
                fileInput.click();
            }),
            "Tạo link": button(async () => {
                try {
                    const key = generateRandomFileName();
                    await uploadFileStorage(key, selectedFile.current.name, selectedFile.current);
                    const dataForDatabase = {
                        title: title.current,
                        description: description.current,
                        placement: placement.current,
                    };
                    await uploadFileDatabase(key, dataForDatabase);
                    router.push(`/model/${key}`)
                } catch (error) {
                    console.error('Error during file and database upload:', error);
                }
            }),
        };
        return controls;
    });

    return (
        <div className='create'>
            <Leva titleBar={{ title: "Bảng điều khiển", drag: false }} hideCopyButton={true} />
            {router.isFallback ? <h1>Loading…</h1> : (
                <model-viewer
                    src={stateFileBlobUrl}
                    alt={description.current}
                    title={title.current}
                    ar-scale="auto"
                    camera-controls
                    touch-action="pan-y"
                    auto-rotate
                    shadow-intensity="1"
                    // ar = {arCheck}
                />
            )}
        </div>
    );
}
