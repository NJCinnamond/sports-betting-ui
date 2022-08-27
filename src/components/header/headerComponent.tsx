import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing(4),
        justifyContent: 'flex-end',
        gap: theme.spacing(1),
    }
}));

export const Header = () => {
    const classes = useStyles();
    const { account, activateBrowserWallet, deactivate } = useEthers();

    const isConnected = account !== undefined;

    console.log("Account: ", account);

    return (
        <div className={classes.container}>
            <div>
                {isConnected ? (
                    <Button color="primary" variant="contained" onClick={deactivate}>Disconnect</Button>
                ) : (
                    <Button color="primary" variant="contained" onClick={activateBrowserWallet}>Connect</Button>
                )}
            </div>
        </div>
    );
}