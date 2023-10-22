import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize the Supabase client with your configuration
const supabase = createClient(
    "https://czicgxdmyyjpfkmjpfon.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWNneGRteXlqcGZrbWpwZm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTI4ODQsImV4cCI6MjAxMzM4ODg4NH0.OMLwrt4app9rG8FegOrn6wLqpbS-j76ZInLjSeU-7Fw");

export async function uploadFileStorage(key, filename, filedata) {
    const { data, error } = await supabase.storage
        .from('modelcreate')
        .upload(`${key}/${filename}`, filedata);

    if (error) {
        console.error('Lỗi khi tải lên tệp:', error);
        return null;
    } else {
        console.log('Dữ liệu đã được tải lên thành công:', data);
        return data;
    }
}
export async function getSignedUrlFileStorageByKey(key) {
    const allowedExtensions = ['glb', 'gltf'];
    const listFile = await getFileListInFolder(key, allowedExtensions);
    if (listFile.length <= 0) {
        return null;
    }

    const fileName = listFile[0].fileName;
    const extension = listFile[0].extension;

    // Set the expiration time for the signed URL (e.g., 1 hour from now)
    const expirationTimestamp = new Date();
    expirationTimestamp.setHours(expirationTimestamp.getHours() + 1);

    const { data } = await supabase.storage
        .from('modelcreate')
        .createSignedUrl(`${key}/${fileName}.${extension}`, expirationTimestamp.getTime());
            
    return data;
}



export async function getFileListInFolder(key, allowedExtensions) {
    const { data, error } = await supabase.storage
        .from('modelcreate')
        .list(key); // Specify the folder path you want to list

    if (error) {
        console.error('Error listing files:', error);
        return null;
    }

    const fileData = data.map((file) => {
        const parts = file.name.split('.'); // Split the file name by periods
        const extension = parts.pop(); // Get the last part as the extension
        const fileName = parts.join('.'); // Join the remaining parts as the file name

        if (allowedExtensions.includes(extension.toLowerCase())) {
            return { fileName, extension };
        }
    });

    return fileData.filter(Boolean); // Filter out files with extensions not in the allowedExtensions list
}


// UploadDatabase
export async function uploadFileDatabase(key, dataJSON) {
    const { data, error } = await supabase
        .from('modelcreate')
        .upsert([
            {
                "key": key,
                "data": dataJSON
            }
        ]);

    if (error) {
        console.error('Lỗi khi tải lên tệp:', error);
        return null;
    } else {
        console.log('Dữ liệu đã được tải lên thành công:', data);
        return data;
    }
}
// GetDatabase
export async function getDataDatabaseByKey(key) {
    const { data, error } = await supabase
        .from('modelcreate')
        .select('data')
        .eq('key', key);

    if (error) {
        console.error('Lỗi khi truy xuất dữ liệu:', error);
        return null;
    } else {
        if (data && data.length > 0) {
            console.log('Dữ liệu đã được truy xuất thành công:', data[0].data);
            return data[0].data;
        } else {
            console.log('Không tìm thấy dữ liệu cho key:', key);
            return null;
        }
    }
}
