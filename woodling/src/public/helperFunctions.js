import { ToastsStore } from 'react-toasts';

export default function convertToFloat(number){
    let temp = 0;
    if(number){
        temp = parseFloat(number);
    }
    return temp;
}

export function copyToClipboard(txt){
    navigator.clipboard.writeText(txt);
    ToastsStore.success("Copied to clipboard.");
}