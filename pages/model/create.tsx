import { useRouter } from 'next/router';
import { Leva, button, folder, useControls } from 'leva';
import { useEffect, useRef, useState } from 'react';
import { handleFileUpload, readFileContent } from '../../components/editor/utils/fileUtils';
import { createSafeObjectUrlFromArrayBuffer } from '../../components/editor/utils/create_object_url';
import { uploadFileDatabase, uploadFileStorage } from '../../components/utils/supabase-storage';
import { generateRandomFileName } from '../../components/utils/random';
import { toast } from 'react-toastify';
import { useSession, useUserInfo } from '../../hooks/useSession';



export default function ModelCreate() {
    const router = useRouter();
    const selectedFile = useRef(null);
    const fileBlobUrl = useRef(null);
    const [stateFileBlobUrl, setFileBlobUrl] = useState(null);
    const title = useRef("");
    const description = useRef("");
    const placement = useRef(false);
    const { session } = useSession();
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    
    // useEffect(() => {
    //     if (session && session.user) {
    //         const user_id = session.user.identities[0].user_id;
    //         const user_email = session.user.email;
    //         setUserId(user_id);
    //         setEmail(user_email);
    //     }
    // }, [session, userId, email]);
    
    
    useControls(() => {
        const controls = {
            "author": {
                value: "Author: Blong1204\nEmail: longle12042006a@gmail.com",
                editable: false,
                label: "",
            },
            "userId" : {
                value: userId
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
                // if (!title.current || !description.current || placement.current === null) {
                //     // Check if any of the required fields are empty
                //     toast.error("Please fill in all the required fields.");
                //     return; // Exit the function
                // }
                // try {
                //     const key = generateRandomFileName();
                //     await uploadFileStorage(userId, key, selectedFile.current.name, selectedFile.current);
                //     const dataForDatabase = {
                //         title: title.current,
                //         description: description.current,
                //         placement: placement.current,
                //     };
                //     await uploadFileDatabase(key, userId, dataForDatabase);
            
                //     toast.success("Tải dữ liệu thành công!");
            
                //     setTimeout(() => {
                //         router.push(`/model/${key}`);
                //     }, 5000);
                // } catch (error) {
                //     toast.warning("Error during file and database upload: "+error);
                // }
                console.log(userId);
                
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
                />
            )}
        </div>
    );
}
