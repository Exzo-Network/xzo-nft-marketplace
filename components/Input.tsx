import React from 'react';
import { useCurrentNFTContext } from '../context/NFTContext';

type InputProps = {
  inputType: 'input' | 'textarea' | 'number';
  title: string;
  placeholder: string;
  handleClick?: React.ChangeEventHandler;
}

const Input = ({ inputType, title, placeholder, handleClick }: InputProps) => {
  const { nftCurrency } = useCurrentNFTContext();

  return (
    <div className="w-full mt-10">
      <p className="flex-1 text-xl font-semibold font-poppins dark:text-white">{title}</p>

      {inputType === 'number' ? (
        <div className="flex-row w-full px-4 py-3 mt-4 text-base border rounded-lg outline-none font-poppins dark:text-white text-nft-gray-2 flexBetween">
          <input
            type="number"
            className="flex w-full outline-none dark:bg-nft-black-1"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="flex-1 text-xl font-semibold font-poppins dark:text-white ">{nftCurrency}</p>
        </div>
      ) : inputType === 'textarea' ? (
        <textarea
          name=""
          id=""
          rows={10}
          className="w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 font-poppins dark:text-white text-nft-gray-2"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          type="text"
          className="w-full px-4 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 font-poppins dark:text-white text-nft-gray-2"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  handleClick: () => {},
};

export default Input;
