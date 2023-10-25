import React, { useEffect, useState } from 'react';
import CardView from './card';
import AddCardView from './add-card';

export default function EmptyStates({ session }) {
    const [filterValue, setFilterValue] = useState('all');
    const [sortValue, setSortValue] = useState('date_created');

    useEffect(() => {
        // Your useEffect logic here
    }, []);

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
        // Add any logic you need to handle the filter change
    };

    const handleSortChange = (e) => {
        setSortValue(e.target.value);
        // Add any logic you need to handle the sort change
    };

    return (
        <div className='content'>
            <div className="mb-10 flex justify-between items-center">
                <h3 className='sm:text-4xl text-2xl mb-0'>My Widgets</h3>
                <div className="filterSort">
                    <div className="filter">
                        <span>Filter by: </span>
                        <select value={filterValue} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="clock">Clock</option>
                        </select>
                    </div>
                    <div className="filter">
                        <span>Sort by: </span>
                        <select value={sortValue} onChange={handleSortChange}>
                            <option value="date_created">Date Created</option>
                            <option value="last_viewed">Last Viewed</option>
                            <option value="alphabetical">Alphabetical (by Widget)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <CardView />
                <CardView />
                <AddCardView />
            </div>
        </div>
    );
}
