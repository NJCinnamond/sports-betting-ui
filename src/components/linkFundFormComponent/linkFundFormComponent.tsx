import { Alert, Box } from "@mui/material";
import { Button, CircularProgress, makeStyles, Snackbar } from "@material-ui/core";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { approveLinkTransactionName, transferLinkTransactionName, useLinkTransfer, useLinkWithdraw } from "../../hooks/link";
import { useNotifications } from "@usedapp/core";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import { TransactionEntry, transactionsActions } from "../../redux/reducers/transactions";
import { store, useTypedSelector } from "../../redux/store";

export interface LinkFundFormComponentProps {
    stakeAmount: number,
    direction: StakeDirection,
    toggleStakeDirection: () => void;
    validity: StakeValidity,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: "0.4em",
        height: "2.8em",
    },
    stakeBtn: {
        flexBasis: "70%",
    },
    dirBtn: {
        margin: "0 0.3em",
        flexBasis: "30%",
    },
}));

export const LinkFundFormComponent = (props: LinkFundFormComponentProps) => {
    const classes = useStyles();
    const { notifications } = useNotifications();

    // Redux store for selected fixture view
    const txns = useTypedSelector((state) => state.transactions);
    const txnNameFromHash = (hash: string) => txns[hash];

    const { approveAndStake, state: approveAndStakeERC20State } = useLinkTransfer();
    const { linkWithdrawSend, linkWithdrawState } = useLinkWithdraw();

    const handleStakeAction = (dir: StakeDirection) => {
        const amount = utils.parseEther(props.stakeAmount.toString());

        if (dir == StakeDirection.STAKE) {
            const amount = utils.parseEther(props.stakeAmount.toString());
            approveAndStake(amount.toString());
        } else {
            linkWithdrawSend(amount.toString());
        }
    };

    const isMining = approveAndStakeERC20State.status === "Mining";
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false);
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false);

    // Maintain txn identity via txn hash store
    useEffect(() => {
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === approveLinkTransactionName).length > 0) {
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === approveLinkTransactionName)[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));
        }
        if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === approveLinkTransactionName).length > 0) {
            setShowErc20ApprovalSuccess(true);
            setShowStakeTokenSuccess(false);
        }
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === transferLinkTransactionName).length > 0) {
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === transferLinkTransactionName)[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));
        }
        else if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === transferLinkTransactionName).length > 0) {
            setShowErc20ApprovalSuccess(false);
            setShowStakeTokenSuccess(true);
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess]);

    // State of LINK approval & transfer
    const [isException, setIsException] = useState<boolean>(false);
    useEffect(() => {
        if (approveAndStakeERC20State.status === "Exception") {
            setIsException(true);
        }
        if (linkWithdrawState.status === "Exception") {
            setIsException(true);
        }
    }, [approveAndStakeERC20State]);

    const handleSnackbarClose = () => {
        setShowErc20ApprovalSuccess(false);
        setShowStakeTokenSuccess(false);
        setIsException(false);
    };

    return (
        <>
            <Box className={classes.container}>
                <Button
                    className={classes.stakeBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => handleStakeAction(props.direction)}
                    disabled={!props.validity.isValid || isMining}
                >
                    {isMining ? <CircularProgress size={26} /> : props.direction == StakeDirection.STAKE ? "TRANSFER" : "WITHDRAW"}
                </Button>
                <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()} disabled={!props.validity.isValid || isMining}>
                    <HiSwitchVertical />
                </Button>
            </Box >
            <Snackbar
                open={showErc20ApprovalSuccess}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">LINK token transfer approval succeeded! Now confirm the second transaction to transfer the LINK.</Alert>
            </Snackbar>
            <Snackbar
                open={showStakeTokenSuccess}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">LINK transferred!.</Alert>
            </Snackbar>
            <Snackbar
                open={isException}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">LINK transfer failed.</Alert>
            </Snackbar>
        </>
    );
}