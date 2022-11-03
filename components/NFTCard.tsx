import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import { useCurrentNFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils';

interface NFTDetails {
  i?: number;
  name: string;
  seller: string;
  owner: string;
  description: string;
  image?: any;
  price: string;
}

type NFTCardProps = {
  nft: NFTDetails;
  onProfilePage?: boolean;
}

const NFTCard = ({ nft, onProfilePage }: NFTCardProps) => {
  const { nftCurrency } = useCurrentNFTContext();
  return (
    <Link href={{ pathname: '/nft-details', query: { ...nft } }}>
      <div className="flex-1 p-4 m-4 shadow-md cursor-pointer min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-32 nft-card-style rounded-2xl minlg:m-8 sm:my-2 sm:mx-2">
        <div className="relative w-full overflow-hidden h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl">
          <Image
            src={nft.image || images[`nft${nft.i}` as keyof typeof images]}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl">{nft.name}</p>
          <div className="flex-row mt-1 flexBetween minlg:mt-3 xs:flex-col xs:items-start xs:mt-3">
            <p className="text-xs font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-lg">{nft.price} <span className="normal">{nftCurrency}</span></p>
            <p className="text-xs font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-lg">{shortenAddress(onProfilePage ? nft.owner : nft.seller)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

NFTCard.defaultProps = {
  onProfilePage: false,
};

export default NFTCard;
