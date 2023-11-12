import Link from 'next/link'
import React from 'react'

export default function AddCardView() {
    return (
        <div className='addCardView'>
            <Link href="/model" replace className='Panels'>
                <div className="newWidget">
                    <div className="newWidgetBtn">
                        <span>+</span> Tạo dự án mới
                    </div>
                </div>
            </Link>
        </div>
    )
}
