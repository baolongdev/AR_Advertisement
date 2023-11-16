import React, { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color';
import { useSession } from '../../hooks/useSession';
import { useRouter } from 'next/router';
import { Accordion, AccordionBody, AccordionHeader, AccordionList, Divider, Switch } from "@tremor/react";
import TextInput from '../../components/model/text-input';
import { toast } from 'react-toastify';
import { generateRandomFileName } from '../../components/utils/random';
import { uploadFileStorage, uploadFileDatabase } from '../../components/utils/supabase-storage';
import { handleFileUpload, readFileContent } from '../../components/utils/editor/fileUtils';
import InfoContainer from '../../components/model/info-container';
import ModelViewer from '../../components/model/model-viewer';
import ListHospots from '../../components/model/list-hospots';
import PluginControls from '../../components/model/plugin';


export default function create() {
    const router = useRouter();
    const { userId, email } = useSession();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [placement, setPlacement] = useState(false);
    const [color, setColor] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileBlobUrl, setFileBlobUrl] = useState('');

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
                const dataForDatabase = {
                    title: title,
                    description: description,
                    placement: placement,
                    color: color,
                    email: email,
                    hospots: PluginControls().convertHotspotsToJSON(),
                };
                await uploadFileDatabase(key, userId, dataForDatabase);
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
                <p className="title">Dự án:
                    <span className='bg-white rounded-md text-black mx-3 px-3'>
                        {title.length > 10 ? title.slice(0, 10) + '...' : title}
                    </span>
                </p>
            </div>
            <div className="dashboard">
                <div className={`view border`} style={{ backgroundColor: color || 'initial' }}>
                    <ModelViewer
                        linkUrl = {fileBlobUrl}
                        // linkUrl={"/model/bed.glb"}
                        title={title}
                        description={""}
                    />
                    <InfoContainer email={email} />
                </div>


                <div className="table">
                    <div className="group1 w-full sm:overflow-y-auto sm:h-[450px] pb-5">
                        <TextInput title={"Tên sản phẩm"} value={title} onValueChange={setTitle} />
                        <TextInput title={"Thông tin mô tả sản phẩm"} value={description} onValueChange={setDescription} />
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPlacement(!placement)}>
                            <Switch id="switch" name="switch" checked={placement} onChange={() => setPlacement(!placement)} />
                            <span className="text-sm ml-2">
                                Đặt trên tường
                            </span>
                        </div>

                        <div className="py-5 flex flex-col gap-5">
                            <h4 className="input__left-addon">
                                Chọn màu nền
                            </h4>
                            <TwitterPicker color={color} onChange={(c) => setColor(c.hex)} />
                        </div>
                        <Divider />
                        <AccordionList>
                            <ListHospots />
                        </AccordionList>
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
                            Tạo mã QR-Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
