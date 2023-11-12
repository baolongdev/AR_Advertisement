import React, { useState } from 'react'
import { Select, SelectItem } from "@tremor/react";
import AddCardView from './add-card';
import ListProject from './list-project';


export default function EmptyStates() {
    const [filterValue, setFilterValue] = useState('Tất cả');
    const [sortValue, setSortValue] = useState('Ngày tạo');

    return (
        <div className='content'>
            <div className="mb-10 flex justify-between items-center">
                <h3 className='sm:text-4xl text-2xl mb-0'>Dự án của tôi</h3>
                <div className="filterSort">
                    <div className="filter">
                        <span>Lọc: </span>
                        <Select value={filterValue} onValueChange={setFilterValue}>
                            <SelectItem value="all">
                                Tất cả
                            </SelectItem>
                        </Select>
                    </div>
                    <div className="filter">
                        <span>Lọc: </span>
                        <Select value={sortValue} onValueChange={setSortValue}>
                            <SelectItem value="date_created">
                                Ngày tạo
                            </SelectItem>
                            <SelectItem value="last_viewed">
                                Xem lần cuối
                            </SelectItem>
                            <SelectItem value="alphabetical">
                                A - Z
                            </SelectItem>
                        </Select>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <ListProject/>
                <AddCardView />
            </div>
        </div>
    )
}

