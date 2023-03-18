import { Button } from "@mui/material"
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { ConnectModal } from "../connectModalComponent/connectModalComponent";

export const ConnectButton = () => {
    const { account } = useEthers();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatAddr = (address: string) => {
        return address.slice(0,6) + "..." + address.slice(-4);
    }

    return (
        <>
            <Button 
                color="primary" 
                variant="outlined" 
                size="large" 
                onClick={handleOpen}
                sx={ { borderRadius: 6, backgroundColor: "#fafbfc", textTransform: "lowercase" } }
            >
                {!account && (<span>Connect</span>)}
                {account && (<span>{formatAddr(account)}</span>)}
            </Button>
            <ConnectModal open={open} handleClose={handleClose}></ConnectModal>
        </>
    )
}