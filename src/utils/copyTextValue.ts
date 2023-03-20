import toast from 'react-hot-toast';

export const copyTextValue = (str: string): void => {
  navigator.clipboard.writeText(str);
  if (str) {
    toast.success('Copied');
  }
};
