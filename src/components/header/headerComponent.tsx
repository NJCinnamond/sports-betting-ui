import { useEthers } from "@usedapp/core";
import { Box, Button, makeStyles } from '@material-ui/core';
import { LinkFundBtn } from "../linkFundBtn/linkFundBtn";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing(4),
        justifyContent: 'flex-end',
        gap: theme.spacing(3),
    },
}));

export const Header = () => {
    const classes = useStyles();
    const { account, activateBrowserWallet, deactivate } = useEthers();

    const isConnected = account !== undefined;

    return (
        <div className={classes.container} id="container">
            <LinkFundBtn disabled={!isConnected}></LinkFundBtn>

            <Box>
                {isConnected ? (
                    <Button color="primary" variant="contained" onClick={deactivate}>Disconnect</Button>
                ) : (
                    <Button color="primary" variant="contained" onClick={activateBrowserWallet}>Connect</Button>
                )}
            </Box>

        </div >
    );
}