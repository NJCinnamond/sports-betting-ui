import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useNotifications } from "@usedapp/core";
import { useEffect, useState } from "react";
import { useFixtureNotifications } from "../../hooks/notifications";
import { getAwaitingFixtureTransactionName, getFulfillingTransactionName, getOpeningFixtureTransactionName, getStakingTransactionName } from "../../services/notificationService";


export interface FixtureNotificationsComponentProps {
    fixtureID: string,
};

export const FixtureNotificationsComponent = (props: FixtureNotificationsComponentProps) => {
    const { notifications } = useNotifications();

    // Important: this hook ensures we accurately receive all notifications for transactions on this fixture
    useFixtureNotifications(props.fixtureID);

    // Handle logic for fixture transaction failing, so snackbar appears with alert
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    useEffect(() => {
        if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getOpeningFixtureTransactionName(props.fixtureID)).length > 0) {
            const snackbarMsg = 'Opening betting for fixture failed. Does the contract have enough LINK?';
            setShowSnackbar(true);
            setSnackbarMessage(snackbarMsg);
        } else if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getStakingTransactionName(props.fixtureID)).length > 0) {
            const snackbarMsg = 'Stake action on fixture failed.';
            setShowSnackbar(true);
            setSnackbarMessage(snackbarMsg);
        } else if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getFulfillingTransactionName(props.fixtureID)).length > 0) {
            const snackbarMsg = 'Payout on fixture failed.';
            setShowSnackbar(true);
            setSnackbarMessage(snackbarMsg);
        } else if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getAwaitingFixtureTransactionName(props.fixtureID)).length > 0) {
            const snackbarMsg = 'Awaiting result on fixture failed.';
            setShowSnackbar(true);
            setSnackbarMessage(snackbarMsg);
        };
    }, [notifications]);

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <Snackbar
            open={showSnackbar}
            onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error">
                {snackbarMessage}
            </Alert>
        </Snackbar>
    )
}