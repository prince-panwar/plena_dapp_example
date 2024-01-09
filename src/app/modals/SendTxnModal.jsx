import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner,Button } from "@nextui-org/react";
import { shortAddress } from "../utils/shortAddress";

export default function SendTxnModal({
  isModalOpen,
  onOpenChange,
  onCancel,
  pendingRequest = false,
  result = {},
}) {
  return (
       <>
        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
            
              <ModalBody>
              <div className='flex flex-col items-center justify-center mt-4'>
        {pendingRequest ? (
          <>
            <p className='font-bold text-xl text-black-500'>Pending Request</p>
            <Spinner color="warning" />
            <p className='font-medium text-lg text-gray-500'>
              Accept or Reject request using your wallet
            </p>
          </>
        ) : result ? (
          <>
            <p className='font-bold text-xl text-black-500'>Request Approved</p>
            <div className='w-full'>
              <div className='flex items-center'>
                <p className='text-base font-bold w-20'>method:</p>
                <p className='text-md font-ligh'>{result?.method}</p>
              </div>
              <div className='flex items-center'>
                <p className='text-base font-bold w-20'>txn Hash:</p>
                <p className='text-md font-ligh'>
                  {shortAddress(result?.txHash, 8)}
                </p>
              </div>
              <div className='flex items-center'>
                <p className='text-base font-bold w-20 '>From:</p>
                <p className='text-sm font-ligh'>{result?.from}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='font-bold text-3xl text-black-500'>
              Request Rejected
            </p>
          </>
        )}
      </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      );
    }