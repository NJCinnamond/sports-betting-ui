import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEthers } from '@usedapp/core';
import { WalletProviderSelectComponent } from './walletProviderSelectComponent';
import { Button } from '@mui/material';

export type ConnectModalProps = {
    open: boolean,
    handleClose: () => void,
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "25px",
};

export const ConnectModal = (props: ConnectModalProps) => {
    const { activateBrowserWallet, deactivate, account } = useEthers();

    const connectProvider = (type: string) => {
        activateBrowserWallet({type});
        props.handleClose();
    };

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>
                        <WalletProviderSelectComponent provider="metamask" onClick={connectProvider} label="Metamask" img="/metamask.png"/>
                        <WalletProviderSelectComponent provider="coinbase" onClick={connectProvider} label="Coinbase Wallet" img="/coinbase.png"/>
                        <div>
                            <Button onClick={deactivate} disabled={!account}>
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
};