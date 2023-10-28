import { useRouter } from 'next/router';
import { Leva, button, folder, useControls } from 'leva';
import { useEffect, useRef, useState } from 'react';
import { handleFileUpload, readFileContent } from '../../components/editor/utils/fileUtils';
import { createSafeObjectUrlFromArrayBuffer } from '../../components/editor/utils/create_object_url';
import { uploadFileDatabase, uploadFileStorage } from '../../components/utils/supabase-storage';
import { generateRandomFileName } from '../../components/utils/random';
import { toast } from 'react-toastify';
import { useSession, useUserInfo } from '../../hooks/useSession';
import { TwitterPicker } from 'react-color';

function createControls(title, description, placement, handleFileUpload, readFileContent) {

}

export default function ModelCreate() {
    const router = useRouter();
    const selectedFile = useRef(null);
    const fileBlobUrl = useRef(null);
    const [stateFileBlobUrl, setFileBlobUrl] = useState(null);
    const userIdRef = useRef("");
    const emailRef = useRef("");

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [placement, setPlacement] = useState(false);
    const [color, setColor] = useState('');
    const { session, userId, email } = useSession();

    useEffect(() => {
        userIdRef.current = userId
        emailRef.current = email
    }, [session, userId, email]);

    const handleFileInput = () => {
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
    };

    const handleCreateLink = async () => {
        if (!title || !description  === null) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        try {
            const key = generateRandomFileName();
            await uploadFileStorage(userIdRef.current, key, selectedFile.current.name, selectedFile.current);
            const dataForDatabase = {
                title: title,
                description: description,
                placement: placement,
                color: color,
            };
            await uploadFileDatabase(key, userIdRef.current, dataForDatabase);

            toast.success("Tải dữ liệu thành công!");

            setTimeout(() => {
                router.push(`/model/${key}`);
            }, 5000);
        } catch (error) {
            toast.warning("Error during file and database upload: " + error);
        }
    };

    return (
        <div className='modelcreate'>
            <div className="header">
                <p className="title">Create and Share</p>
            </div>
            <div className="dashboard">
                <div className={`view border`} style={{backgroundColor:color}}>
                    <model-viewer
                        src={stateFileBlobUrl}
                        alt={description}
                        title={title}
                        ar-scale="auto"
                        camera-controls
                        touch-action="pan-y"
                        auto-rotate
                        shadow-intensity="1"
                    />
                </div>
                <div className="table">
                    <div className="group1 w-full">
                        <div className="">
                            <h4 className="input__left-addon">
                                Tên sản phẩm
                            </h4>
                            <input
                                type="text"
                                className="input w-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <h4 className="input__left-addon">
                                Thông tin mô tả sản phẩm
                            </h4>
                            <input
                                type="text"
                                className="input w-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                checked={placement}
                                onChange={() => setPlacement(!placement)}
                            />
                            <span className="ml-2">Đặt trên tường</span>
                        </label>
                        <div className="py-5">
                            <h4 className="input__left-addon">
                                Chọn màu nền
                            </h4>
                            <TwitterPicker color={color} onChange={(c) => setColor(c.hex)} />
                        </div>
                    </div>
                    <div className="group1 flex flex-col gap-3">
                        <button className="btn btn--hero sm:text-sm text-xs p-3 flex !justify-center cursor-pointer select-none"
                            onClick={handleFileInput}
                        >
                            Tải lên
                        </button>
                        <button className="btn btn--hero sm:text-sm text-xs p-3 flex !justify-center cursor-pointer select-none"
                            onClick={handleCreateLink}
                        >
                            Tạo link
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}



