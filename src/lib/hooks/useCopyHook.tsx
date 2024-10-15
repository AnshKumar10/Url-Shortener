import { useState } from "react";

const useCopy = () => {
  const [isCopying, setIsCopying] = useState(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopying(true);
      setTimeout(() => {
        setIsCopying(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return { copyText, isCopying };
};

export default useCopy;
