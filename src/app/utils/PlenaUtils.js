import { Contract, utils } from 'ethers';
import * as ethUtil from 'ethereumjs-util';
import { convertUtf8ToHex } from '@plenaconnect/utils';

const spec = {
  magicValue: '0x1626ba7e',
  abi: [
    {
      constant: true,
      inputs: [
        {
          name: '_hash',
          type: 'bytes32',
        },
        {
          name: '_sig',
          type: 'bytes',
        },
      ],
      name: 'isValidSignature',
      outputs: [
        {
          name: 'magicValue',
          type: 'bytes4',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
};


export class PlenaUtils{
   static encodePersonalMessage(msg) {
    const data = ethUtil.toBuffer(convertUtf8ToHex(msg));
    const buf = Buffer.concat([
      Buffer.from(
        '\u0019Ethereum Signed Message:\n' + data.length.toString(),
        'utf8'
      ),
      data,
    ]);
    return ethUtil.bufferToHex(buf);
  }
  
  static hashMessage(msg) {
    const data = PlenaUtils.encodePersonalMessage(msg);
    const buf = ethUtil.toBuffer(data);
    const hash = ethUtil.keccak256(buf);
    return ethUtil.bufferToHex(hash);
  }
  

static async validatePlenaSig(
  address,
  sig,
  data,
  provider,
  abi = spec.abi,
  magicValue = spec.magicValue
) {
  let returnValue;
  try {
    returnValue = await new Contract(address, abi, provider).isValidSignature(
      utils.arrayify(data),
      sig
    );
  } catch (e) {
    return false;
  }
  return returnValue.toLowerCase() === magicValue.toLowerCase();
}

};
