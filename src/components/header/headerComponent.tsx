import { useEthers } from "@usedapp/core";
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { LinkFundBtn } from "../linkFundBtn/linkFundBtn";

const PREFIX = 'Header';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: 'flex',
        padding: theme.spacing(4),
        justifyContent: 'flex-end',
        gap: theme.spacing(3),
    }
}));

export const Header = () => {

    const { account, activateBrowserWallet, deactivate } = useEthers();

    const isConnected = account !== undefined;

    return (
        <Root className={classes.container}>
            <LinkFundBtn disabled={!isConnected}></LinkFundBtn>
            <Box>
                {isConnected ? (
                    <Button color="primary" variant="contained" onClick={deactivate}>Disconnect</Button>
                ) : (
                    <Button color="primary" variant="contained" onClick={activateBrowserWallet}>Connect</Button>
                )}
            </Box>

        </Root>
    );
}