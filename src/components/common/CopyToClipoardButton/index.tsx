import { CopyIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

interface Props {
    textToCopy: string;
    children?: React.ReactNode;
}

const CopyToClipboardButton = ({ textToCopy, children }: Props) => {
    const copyToClipboard = () => {
      // Copiar el texto al portapapeles
      navigator.clipboard.writeText(textToCopy);
    };
  
    return (
      <Button
        onClick={copyToClipboard}
        leftIcon={<CopyIcon />}
        variant={'outline'}
      >
        {children}
      </Button>
    );
  };
  
  export default CopyToClipboardButton;
  