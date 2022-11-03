import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import images from '../assets';

export type ActiveSelectOption = 'Recently added' | 'Price(low to high)' | 'Price(high to low)';

const activeSelectList: ActiveSelectOption[] = ['Recently added', 'Price(low to high)', 'Price(high to low)'];

type SearchBarProps = {
  activeSelect: ActiveSelectOption;
  setActiveSelect: React.Dispatch<React.SetStateAction<ActiveSelectOption>>;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (value: string) => void;
  clearSearch: () => void;
}

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flex-1 px-4 py-3 flexCenter glowing-border">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' ? 'filter invert' : ''}
        />
        <input
          type="text"
          placeholder="Search NFT here"
          className="w-full mx-4 text-xs border-none outline-none text-bg"
          onChange={(e) => setDebouncedSearch((e.target as HTMLInputElement).value)}
          value={debouncedSearch}
        />
      </div>
      <div className="relative px-4 py-3 ml-4 border rounded-md cursor-pointer flexBetween sm:ml-0 sm:mt-2 min-w-190 glowing-border" onClick={() => setToggle((prevToogle) => !prevToogle)}>
        <p className="text-xs font-normal font-poppins dark:text-white">{activeSelect}</p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'filter invert' : ''}
        />
        {toggle && (
        <div className="absolute left-0 right-0 z-10 w-full px-4 py-3 mt-3 border rounded-md glowing-border top-full">
          {activeSelectList.map((item, i) => (
            <p
              key={`${item}-${i}`}
              className="my-3 text-xs font-normal cursor-pointer font-poppins"
              onClick={() => setActiveSelect(item)}
            >{item}
            </p>
          ))}
        </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
