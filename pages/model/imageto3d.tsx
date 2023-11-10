import { handleFileUploads, readFileContent } from '../../components/editor/utils/fileUtils';
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

    const [selectedFiles, setSelectedFiles] = useState([]);
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
        fileInput.accept = '.jpg, .jpeg, .png, .gif';
        fileInput.multiple = true;

        fileInput.addEventListener('change', (event) => {
            handleFileUploads(event, async (files) => {
                setSelectedFiles(files);
                console.log('Files received in handleFileInput:', files);
                // if (Array.isArray(files)) {
                //     setSelectedFiles(files);
                //     console.log(files);

                //     files.forEach(async (file) => {
                //         readFileContent(file, async (fileContent, objectUrl) => {
                //             setFileBlobUrl(objectUrl);
                //         });
                //     });
                //     toast.success("Tải lên thành công!");
                // } else {
                //     toast.error('Files is not an array:', files);
                // }
            });
        });
        fileInput.click();
    };
    // const handleCreateLink = async () => {
    //     // Các trường thông tin được điền đầy đủ.
    //     if (title && description && selectedFiles !== null) {
    //         try {
    //             const key = generateRandomFileName();
    //             toast.success("Tải dữ liệu thành công!");
    //             await uploadFileStorage(userId, key, selectedFiles.name, selectedFile);
    //             toast.success("1");
    //             const dataForDatabase = {
    //                 title: title,
    //                 description: description,
    //                 placement: placement,
    //                 color: color,
    //                 email: email,
    //             };
    //             await uploadFileDatabase(key, userId, dataForDatabase);
    //             toast.success("2");
    //             toast.success("Đi thôi!");
    //             router.push(`/model/${key}`);
    //         } catch (error) {
    //             toast.warning(error);
    //         }
    //     } else {
    //         toast.error("Vui lòng điền đầy đủ thông tin!");
    //     }
    // };
    console.log(selectedFiles);
    return (
        <div className='modelcreate overflow-hidden'>
            <div className="header">
                <p className="title">Dự án:
                    <span className='bg-white rounded-md text-black mx-3 px-3'>
                        {title.length > 10 ? title.slice(0, 10) + '...' : title}
                    </span>
                </p>
            </div>
            <div className="dashboard">
                <div className={`view border !overflow-y-scroll max-h-[600px]`} style={{ backgroundColor: color || 'initial' }}>
                    {/* <model-viewer
                        src={fileBlobUrl}
                        alt={description}
                        title={title}
                        ar-scale="auto"
                        camera-controls
                        touch-action="pan-y"
                        auto-rotate
                        shadow-intensity="1"
                    /> */}

                    {selectedFiles && selectedFiles.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                Object.values(selectedFiles).map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={description}
                                        title={title}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <p>No images selected</p>
                    )}
                    <div className="info_container">
                        <a
                            // target="_blank"
                            rel="noreferrer"
                            className="info_textLink"
                            href="#"
                        >
                            {email && (
                                <p className="info_text" style={{ background: "#ffffff", color: "#000000" }}>@{email.split('@')[0]}</p>
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
                    </div>
                    <div className="group1 flex flex-col gap-3">
                        <button className="btn btn--hero sm:text-sm text-xs p-3 flex !justify-center cursor-pointer select-none"
                            onClick={handleFileInput}
                        >
                            Tải lên
                        </button>
                        <button className="btn btn--hero sm:text-sm text-xs p-3 flex !justify-center cursor-pointer select-none"
                        // onClick={handleCreateLink}
                        >
                            Tạo link
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
