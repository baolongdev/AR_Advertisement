import { createSafeObjectUrlFromArrayBuffer } from "./create_object_url";

export function isFileValid(file) {
    // Kiểm tra kích thước tệp (ở đây giới hạn là 50MB)
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSizeInBytes) {
        return false;
    }
    return true;
}

export function handleFileUpload(event, callback) {
    const file = event.target.files[0];
    if (file) {
        // Kiểm tra loại tệp và kích thước
        if (isFileValid(file)) {
            callback(file);
        } else {
            alert('Kích thước không hợp lệ.');
        }
    }
}

export function handleFileUploads(event, callback) {
    const files = event.target.files;

    if (files.length > 0) {
        const invalidFiles = Array.from(files).filter(file => !isFileValid(file));

        if (invalidFiles.length === 0) {
            callback(files);
        } else {
            alert('Kích thước không hợp lệ.');
        }
    }
};


export async function readFileContent(file, callback) {
    const arrayBuffer = await file.arrayBuffer();
    const objectUrl = createSafeObjectUrlFromArrayBuffer(arrayBuffer);
    callback(arrayBuffer, objectUrl.unsafeUrl);
}
