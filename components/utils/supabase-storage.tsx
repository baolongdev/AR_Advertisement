import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize the Supabase client with your configuration
const supabase = createClient(
    "https://czicgxdmyyjpfkmjpfon.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWNneGRteXlqcGZrbWpwZm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTI4ODQsImV4cCI6MjAxMzM4ODg4NH0.OMLwrt4app9rG8FegOrn6wLqpbS-j76ZInLjSeU-7Fw");

export async function uploadFile(root, filename, filedata) {
    const { data, error } = await supabase.storage
        .from('modelcreate')
        .upload(`${root}/${filename}.`, filedata);

    if (error) {
        console.error('Lỗi khi tải lên tệp:', error);
        return null;
    } else {
        console.log('Dữ liệu đã được tải lên thành công:', data);
        return data;
    }
}
