import { handleFileUpload, readFileContent } from '../../components/editor/utils/fileUtils';
import { uploadFileDatabase, uploadFileStorage } from '../../components/utils/supabase-storage';
import { generateRandomFileName } from '../../components/utils/random';
import { useSession } from '../../hooks/useSession';
import React, { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function test() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [placement, setPlacement] = useState(false);
    const [color, setColor] = useState('');
    const { session, userId: userIdFromSession, email } = useSession();
    const [userId, setUserId] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileBlobUrl, setFileBlobUrl] = useState('');

    useEffect(() => {
        setUserId(userIdFromSession);
    }, [userIdFromSession]);

    useEffect(() => {

    }, [session, userId, email]);

    const handleFileInput = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.accept = '.glb, .gltf';

        fileInput.addEventListener('change', (event) => {
            handleFileUpload(event, async (file) => {
                setSelectedFile(file);
                readFileContent(file, async (fileContent, objectUrl) => {
                    setFileBlobUrl(objectUrl);
                    toast.success("Tải lên thành công!");
                });
            });
        });
        fileInput.click();
    };
    const handleCreateLink = async () => {
        // Các trường thông tin được điền đầy đủ.
        if (title && description && selectedFile !== null) {
            try {
                const key = generateRandomFileName();
                toast.success("Tải dữ liệu thành công!");
                await uploadFileStorage(userId, key, selectedFile.name, selectedFile);
                toast.success("1");
                const dataForDatabase = {
                    title: title,
                    description: description,
                    placement: placement,
                    color: color,
                };
                await uploadFileDatabase(key, userId, dataForDatabase);
                toast.success("2");
                toast.success("Đi thôi!");
                router.push(`/model/${key}`);
            } catch (error) {
                toast.warning(error);
            }
        } else {
            toast.error("Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <div className='modelcreate'>
            <div className="header">
                <p className="title">Create and Share</p>
            </div>
            <div className="dashboard">
                <div className={`view border`} style={{ backgroundColor: color || 'initial' }}>
                    <model-viewer
                        src={fileBlobUrl}
                        alt={description}
                        title={title}
                        ar-scale="auto"
                        camera-controls
                        touch-action="pan-y"
                        auto-rotate
                        shadow-intensity="1"
                    />
                    <div className="info_container">
                        <a
                            // target="_blank"
                            rel="noreferrer"
                            className="info_textLink"
                            href="#"
                        >
                            {email && (
                                <p className="info_text" style={{background: "#ffffff", color: "#000000"}}>@{email.split('@')[0]}</p>
                            )}
                        </a>
                    </div>
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
    )
}
