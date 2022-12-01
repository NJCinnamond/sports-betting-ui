import { Snackbar } from "@mui/material";
import { Alert, AlertColor } from "@mui/material";
import { TransactionLinkComponent } from "../transactionLinkComponent/transactionLinkComponent";

export interface FixtureNotificationSnackbarComponentProps {
    showNotif: boolean,
    setShowNotif: (show: boolean) => void,
    severity: AlertColor,
    message: string,
    txnName: string,
};

export const FixtureNotificationSnackbarComponent = (props: FixtureNotificationSnackbarComponentProps) => {
    const handleSnackbarClose = () => {
        props.setShowNotif(false);
    };

    return (
        <Snackbar
            open={props.showNotif}
            onClose={handleSnackbarClose}
            autoHideDuration={6000}>
                <Alert onClose={handleSnackbarClose} severity={props.severity}>
                    {props.message} 
                    <TransactionLinkComponent txnName={props.txnName}></TransactionLinkComponent>
                </Alert>
        </Snackbar>
    )
}