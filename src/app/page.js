"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { usePlenaWallet } from 'plena-wallet-sdk';
export default function Home() {
 const { openModal, closeConnection, sendTransaction, walletAddress } =usePlenaWallet();
  return (
    <>
    {/* <ThemeSwitcher/> */}
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="mb-8 text-2xl font-bold">Welcome to Plena Connect</h1>
    <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="full" onClick={openModal} >
        Connect
    </Button>
    </div>
    </>
  )
}
