import { useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFixtureNotifications } from "../../hooks/notifications";
import { useTypedSelector } from "../../redux/store";
import { getAwaitingFixtureTransactionName, getFulfillingTransactionName, getOpeningFixtureTransactionName, getStakingTransactionName } from "../../services/notificationService";
import { TransactionLinkComponent } from "../transactionLinkComponent/transactionLinkComponent";

const PREFIX = 'FixtureNotificationsComponent';

const classes = {
    parent: `${PREFIX}-parent`,
    child: `${PREFIX}-child`
};

const StyledToastContainer = styled(ToastContainer)((
    {
        theme
    }
) => ({
    [`& .${classes.parent}`]: {
        textAlign: "center",
    },

    [`& .${classes.child}`]: {
        float: "left",
    }
}));

export interface FixtureNotificationsComponentProps {
    fixtureID: string,
}

interface NotifProps {
    message: string,
    txnName: string
}

const NotifElement = (props: NotifProps) => {

    return (
        <div className={classes.parent}>
            <div className={classes.child}>
                {props.message}
            </div>
            <div className={classes.child}>
                <TransactionLinkComponent txnName={props.txnName}></TransactionLinkComponent>
            </div>
        </div>
    )
}

export const FixtureNotificationsComponent = (props: FixtureNotificationsComponentProps) => {
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    // Important: this hook ensures we accurately receive all notifications for transactions on this fixture
    useFixtureNotifications(props.fixtureID);

    useEffect(() => {
        // Opening
        if (fixtureViewStates[props.fixtureID]?.opening == "Mining") {
            const snackbarMsg = "Opening txn started:";
            const txnName = getOpeningFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.opening == "Fail") {
            const snackbarMsg = 'Opening betting for fixture failed. Does the contract have enough LINK?';
            const txnName = getOpeningFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.error(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.opening == "Success") {
            const snackbarMsg = 'Opening txn succeeded:';
            const txnName = getOpeningFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.success(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } 
    }, [fixtureViewStates[props.fixtureID]?.opening]);

    useEffect(() => {
        // Staking
        if (fixtureViewStates[props.fixtureID]?.staking == "Mining") {
            const snackbarMsg = "Staking txn started:";
            const txnName = getStakingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } 
        else if (fixtureViewStates[props.fixtureID]?.staking == "Fail") {
            const snackbarMsg = 'Staking txn failed:';
            const txnName = getStakingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.error(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.staking == "Success") {
            const snackbarMsg = 'Staking txn succeeded:';
            const txnName = getStakingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.success(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } 
    }, [fixtureViewStates[props.fixtureID]?.staking]);
        
    useEffect(() => {
        // AWAITING
        if (fixtureViewStates[props.fixtureID]?.awaiting == "Mining") {
            const snackbarMsg = "Awaiting txn started:";
            const txnName = getAwaitingFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.awaiting == "Fail") {
            const snackbarMsg = 'Awaiting txn failed:';
            const txnName = getAwaitingFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.error(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.awaiting == "Success") {
            const snackbarMsg = 'Awaiting txn succeeded:';
            const txnName = getAwaitingFixtureTransactionName(props.fixtureID);
            toast.dismiss();
            toast.success(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        }
    }, [fixtureViewStates[props.fixtureID]?.opening]);

    useEffect(() => {
        // FULFILLING
        if (fixtureViewStates[props.fixtureID]?.fulfilling == "Mining") {
            const snackbarMsg = "Fulfilling txn started:";
            const txnName = getFulfillingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.fulfilling == "Fail") {
            const snackbarMsg = 'Fulfilling txn failed:';
            const txnName = getFulfillingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } else if (fixtureViewStates[props.fixtureID]?.fulfilling == "Success") {
            const snackbarMsg = 'Fulfilling txn succeeded:';
            const txnName = getFulfillingTransactionName(props.fixtureID);
            toast.dismiss();
            toast.info(
                <NotifElement message={snackbarMsg} txnName={txnName}/>
            );
        } 
    }, [fixtureViewStates[props.fixtureID]?.fulfilling]);

    return (
        <StyledToastContainer/>
    )
}