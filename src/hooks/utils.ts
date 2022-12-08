import { ethers } from 'ethers';

export const truncateAddress = (address: string) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{3})$/
    );
    if (!match) return address;
    return `${match[1]} / ${match[2]}`;
};

export const toHex = (num: number) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export const isValidAddress = (toCheck: string) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/
    return addressRegex.test(toCheck)
}

export const toAddress = (protoAddress: string) => {
    if (!isValidAddress(protoAddress)) throw 'Not a valid address'
    return ethers.utils.getAddress(protoAddress)
}