'use client'
import React, { useState ,useEffect} from 'react';
import { eip1271 } from './utils/eip1271';
import { hashMessage } from './utils/utiliities';
import { Button } from '@nextui-org/react';
import { usePlenaWallet } from 'plena-wallet-sdk';
import ThemeSwitcher from './components/theme.Switcher';
import SendTxnModal from './modals/SendTxnModal';
import SignMessageModal from './modals/SignMessage';
import { ethers } from 'ethers';
import Header from './components/Header';
import { convertUtf8ToHex} from '@plenaconnect/utils';

export default function ClientSideComponent() {
  const [pending, setPending] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isTxnModalOpen, setIsTxnModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const { openModal, closeConnection, sendTransaction, walletAddress } = usePlenaWallet();

  const disconnect = async () => {
    closeConnection();
  };
  

  const openTxnModal = () => {
    setIsTxnModalOpen(true);
  };

  const openSignModal = () => {
    setIsSignModalOpen(true);
  };

  const closeTxnModal = () => {
    setIsTxnModalOpen(false);
    setPending(false);
    setResult(false);
  };

  const closeSignModal = () => {
    setIsSignModalOpen(false);
    setPending(false);
    setResult(false);
  };

  const cancelTransaction = () => {};

  const testSendTransaction = async () => {
    openTxnModal();
    setPending(true);

    const lendingPool = '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf';
    const USDC = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    const abi1 = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const contract = new ethers.utils.Interface(abi1);

    const txnData1 = contract.encodeFunctionData('transfer', [lendingPool, '1']);
    // Draft transaction
    const tx = {
      from: walletAddress,
      data: [txnData1],
      to: [USDC],
      tokens: ['', ''],
      amounts: ['0x0', '0x0'],
    };

    try {
      const res = await sendTransaction({
        chain: 137,
        method: 'send_transaction', // personal_sign
        payload: {
          transaction: tx,
          // todo: payload of transaction
        },
      });

      if (!res?.success) {
        setResult(false);
        return;
      }

      const formattedResult = {
        method: 'send_transaction',
        txHash: res?.content?.transactionHash,
        from: walletAddress,
      };
      setResult(formattedResult);
    } catch (error) {
      setResult(null);
    } finally {
      setPending(false);
    }
  };

  const testSignTransaction = async () => {
    openSignModal();
    setPending(true);
   
    

    try {
      const message = `My email is john@doe.com - ${new Date().toUTCString()}`;

      // encode message (hex)
      const hexMsg = convertUtf8ToHex(message);

      // eth_sign params
      const msgParams = [hexMsg, walletAddress];
      const res = await sendTransaction({
        chain: 137,
        method: 'personal_sign',
        payload: {
          msgParams,
        },
      });

      if (!res?.success) {
        setResult(false);
        return;
      }

      const hash = hashMessage(message);
      const polygonProvider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
      const valid = await eip1271.isValidSignature(
        walletAddress,
        res?.content?.signature,
        hash,
        polygonProvider
      );

      const formattedResult = {
        method: 'personal_sign',
        signature: res?.content?.signature,
        from: walletAddress,
      };
      setResult(formattedResult);
    } catch (error) {
      setResult(null);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <ThemeSwitcher />
      {!walletAddress ? (
        <>
          <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='mb-8 text-2xl font-bold'>Welcome to Plena Connect</h1>
            <Button
              radius='full'
              className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
              onClick={openModal}
            >
              Connect
            </Button>
          </div>
        </>
      ) : (
        <div className='h-100 flex justify-center items-center mt-8'>
          <div className=' h-4/5 w-72 border-3 border-solid border-[#985AFF] rounded-2xl'>
            <Header disconnect={disconnect} walletAddress={walletAddress} />
            <div className='flex flex-col items-center justify-center '>
              <h1 className='mb-8 text-2xl mt-20'>Methods</h1>
              <div className='flex flex-col h-auto'>
                <Button color='primary' onClick={testSignTransaction}>
                  Personal Sign
                </Button>
                <Button
                  className='mt-8'
                  color='primary'
                  onClick={testSendTransaction}
                  cancelTransaction={cancelTransaction}
                >
                  Send Transaction
                </Button>
                <Button
                  color='primary'
                  variant='bordered'
                  onClick={disconnect}
                  className='mb-8 mx-2 mt-40 px-10 py-5 f'
                >
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <SendTxnModal
        isModalOpen={isTxnModalOpen}
        onCancel={closeTxnModal}
        pendingRequest={pending}
        result={result}
      />
      <SignMessageModal
        isModalOpen={isSignModalOpen}
        onCancel={closeSignModal}
        pendingRequest={pending}
        result={result}
      />
    </>
  );
}
