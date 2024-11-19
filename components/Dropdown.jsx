import React from 'react';

export const Dropdown = ({ label, setItem, items }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="font-bold text-white">
        {label}
      </label>
      <select
        name={label}
        className="block max-w-full rounded-lg text-blue-800 py-2 px-4 h-10"
        onChange={e => setItem(e.target.value)}
      >
        {items.map(item => (
          <option
            value={item.MakeId ? item.MakeId : item}
            key={item.MakeId ? item.MakeId : item}
          >
            {item.MakeId ? item.MakeId : item}
          </option>
        ))}
      </select>
    </div>
  );
};
