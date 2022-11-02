import { Alert, Box } from "@mui/material";
import { Button, CircularProgress, makeStyles, Snackbar } from "@material-ui/core";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { useLinkTransfer, useLinkWithdraw } from "../../hooks/link";
import { useNotifications } from "@usedapp/core";
import { useEffect, useState } from "react";
import { utils } from "ethers";

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

    // TODO: notifs for errors
    useEffect(() => {
        if (notifications.filter((n) => n.type === "transactionSucceed" && n.transactionName === "Approve LINK transfer").length > 0) {
            setShowErc20ApprovalSuccess(true);
            setShowStakeTokenSuccess(false);
        }
        if (notifications.filter((n) => n.type === "transactionSucceed" && n.transactionName === "Transfer LINK").length > 0) {
            setShowErc20ApprovalSuccess(false);
            setShowStakeTokenSuccess(true);
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess]);

    const handleSnackbarClose = () => {
        setShowErc20ApprovalSuccess(false);
        setShowStakeTokenSuccess(false);
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
        </>
    );
}