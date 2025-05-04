// pages/api/showcase/index.js

import { getAllData } from '../../../components/utils/supabase-storage';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const data = await getAllData();


        if (!data || data.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Không có dữ liệu',
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        console.error('[API] Lỗi khi truy xuất dữ liệu:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server nội bộ'
        });
    }
}
