import React from 'react';
import {User} from "@nextui-org/react";
import { shortAddress } from '../utils/shortAddress';

export default function Header({ walletAddress }) {
  return (
    <div className='flex-col items-start justify-between px-5 py-2'>
      <div className='flex items-center'>
        <User   
        name={shortAddress(walletAddress || '', 5)}
        avatarProps={{
          src: "https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-coin-5533573-4623160.png"
        }}/>
       
      </div>
      {/* <div>
        <p
          className='text-sm font-regular my-0 cursor-pointer'
          onClick={disconnect}>
          {'Disconnect'}
        </p>
      </div> */}
    </div>
  )
    }