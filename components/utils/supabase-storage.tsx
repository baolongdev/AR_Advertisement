import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize the Supabase client with your configuration
export const supabase = createClient(
    "https://lklkryecbqvxxheajwly.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbGtyeWVjYnF2eHhoZWFqd2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODUzNTQsImV4cCI6MjA2MTg2MTM1NH0.pqMI33Z3ZDGJBDywMKs4mKEDK7g0ysa9AM2RrMkOVYc");

export async function uploadFileStorage(userId, key, filename, filedata) {
    const { data, error } = await supabase.storage
        .from('modelcreate')
        .upload(`${userId}/${key}/${filename}`, filedata);

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
    const userId = await getUserIdByKey(key);

    const listFile = await getFileListInFolder(userId, key, allowedExtensions);
    console.log(listFile);
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
        .createSignedUrl(`${userId}/${key}/${fileName}.${extension}`, expirationTimestamp.getTime());

    return data;
}



export async function getFileListInFolder(userId, key, allowedExtensions) {
    const { data, error } = await supabase.storage
        .from('modelcreate')
        .list(`${userId}/${key}`); // Specify the folder path you want to list

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
export async function uploadFileDatabase(key, userId, dataJSON) {
    const { data, error } = await supabase
        .from('modelcreate')
        .upsert([
            {
                "key": key,
                "data": dataJSON,
                "userId": userId
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

export async function getUserIdByKey(key) {
    // Assuming you have a table named 'modelcreate' that stores the mapping of keys to userId
    const { data, error } = await supabase
        .from('modelcreate')
        .select('userId')
        .eq('key', key);

    if (error) {
        console.error('Error fetching userId:', error);
        return null;
    } else if (data && data.length > 0) {
        return data[0].userId;
    } else {
        return null; // Handle the case where userId is not found for the given key
    }
}

export async function getAllDataByUserId(userId) {
    const { data, error } = await supabase
        .from('modelcreate')
        .select('key, data, created_at, userId')
        .eq('userId', userId);

    if (error) {
        console.error('Lỗi khi truy xuất dữ liệu:', error);
        return null;
    } else {
        if (data && data.length > 0) {
            console.log('Dữ liệu đã được truy xuất thành công:', data);
            return data;
        } else {
            console.log('Không tìm thấy dữ liệu cho userId:', userId);
            return [];
        }
    }
}
export async function getAllData() {
    const { data, error } = await supabase
        .from('modelcreate')
        .select('key, data, created_at, userId')

    if (error) {
        console.error('Lỗi khi truy xuất dữ liệu:', error);
        return null;
    } else {
        if (data && data.length > 0) {
            console.log('Dữ liệu đã được truy xuất thành công:', data);
            return data;
        } else {
            console.log('Không tìm thấy dữ liệu :');
            return [];
        }
    }
}



export async function deleteModelFromDatabase(key) {
    // Delete from Supabase database
    const { error } = await supabase
        .from('modelcreate')
        .delete()
        .eq('key', key);

    if (error) {
        console.error('Error deleting model from the database:', error);
    }

    return error;
}

export async function deleteModelFromStorage(userId, key) {
    // Delete from Supabase storage
    const { error } = await supabase.storage
        .from('modelcreate')
        .remove([`${userId}/${key}/*`]); // Use wildcard to delete all files in the folder

    if (error) {
        console.error('Error deleting model from storage:', error);
    }

    return error;
}
