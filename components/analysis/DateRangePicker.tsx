import React, { useState } from 'react';
import { DateRangePicker, DateRangePickerItem } from "@tremor/react";


export const getDateAgo = (days) => new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);

export default function DateRangePickerComp({placeholder, onValueChange }) {
  const [value, setValue] = useState();
  
  const ranges = [
    { key: "24h", value: "24h", label: "24 giờ qua", days: 1 },
    { key: "7d", value: "7d", label: "7 ngày qua", days: 7 },
    { key: "30d", value: "30d", label: "30 ngày qua", days: 30 },
  ];

  const handleDateRangeChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <DateRangePicker
      selectPlaceholder="Seleccionar"
      color="rose"
      value={value}
      onValueChange={handleDateRangeChange}
    >
      {ranges.map(range => (
        <DateRangePickerItem
          key={range.key}
          value={range.value}
          from={getDateAgo(range.days)}
        >
          {range.label}
        </DateRangePickerItem>
      ))}
    </DateRangePicker>
  );
}

