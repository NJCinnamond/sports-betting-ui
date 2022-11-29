import { useNotifications } from "@usedapp/core";
import { useEffect } from "react";
import { getAwaitingFixtureTransactionName, getFulfillingTransactionName, getOpeningFixtureTransactionName, getStakingTransactionName } from "../services/notificationService";
import { setAwaitingTransactionState, setFulfillingTransactionState, setOpeningTransactionState, setStakingTransactionState } from "../services/viewService";
import { store, useTypedSelector } from "../redux/store"
import { TransactionEntry, TransactionEntryType, transactionsActions } from "../redux/reducers/transactions";

export const useFixtureNotifications = (fixtureID: string) => {
    const { notifications } = useNotifications();

    // Redux store for selected fixture view
    const txns = useTypedSelector((state) => state.transactions);

    //////////////////////////////////
    // Basically, Success/Failure txns received via notifications on ArbitrumGoerli don't seem to retain the transactionName from the Started notifs
    // Hence we use a redux store 'notifications' to act as a key-value store for transaction hash -> transaction name, allowing us to recover the transaction 
    // name when we receive a txn payload via a useDapp notification hook payload.
    //////////////////////////////////
    const txnNameFromHash = (hash: string) => txns[TransactionEntryType.HASH][hash];

    useEffect(() => {
        //
        // OPENING FIXTURE TRANSACTIONS
        //
        // Opening fixture transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            // Get notif and add name<->hash to store
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getOpeningFixtureTransactionName(fixtureID))[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));

            setOpeningTransactionState(fixtureID, "Mining");
        };

        // Opening fixture transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            setOpeningTransactionState(fixtureID, "Success");
        };

        // Opening fixture transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && txnNameFromHash(n.transaction?.hash) === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            setOpeningTransactionState(fixtureID, "Fail");
        };


        //
        // STAKING TRANSACTIONS
        //
        // Staking or unstaking transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getStakingTransactionName(fixtureID)).length > 0) {
            // Get notif and add name<->hash to store
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getStakingTransactionName(fixtureID))[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));

            setStakingTransactionState(fixtureID, "Mining");
        };

        // Staking or unstaking transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === getStakingTransactionName(fixtureID)).length > 0) {
            setStakingTransactionState(fixtureID, "Success");
        };

        // Staking or unstaking transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && txnNameFromHash(n.transaction?.hash) === getStakingTransactionName(fixtureID)).length > 0) {
            setStakingTransactionState(fixtureID, "Fail");
        };


        //
        // AWAITING TRANSACTIONS
        //
        // Awaiting fixture result transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getAwaitingFixtureTransactionName(fixtureID)).length > 0) {
            // Get notif and add name<->hash to store
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getAwaitingFixtureTransactionName(fixtureID))[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));

            setAwaitingTransactionState(fixtureID, "Mining");
        };

        // Awaiting fixture result transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === getAwaitingFixtureTransactionName(fixtureID)).length > 0) {
            setAwaitingTransactionState(fixtureID, "Success");
        };

        // Awaiting fixture result transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && txnNameFromHash(n.transaction?.hash) === getAwaitingFixtureTransactionName(fixtureID)).length > 0) {
            setAwaitingTransactionState(fixtureID, "Fail");
        };


        //
        // FULFILLING FIXTURE TRANSACTIONS
        //
        // Staking or unstaking transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getFulfillingTransactionName(fixtureID)).length > 0) {
            // Get notif and add name<->hash to store
            const notif: any = notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getFulfillingTransactionName(fixtureID))[0];
            store.dispatch(transactionsActions.new({ name: notif.transactionName, hash: notif.transaction?.hash } as TransactionEntry));

            setFulfillingTransactionState(fixtureID, "Mining");
        };
        // Staking or unstaking transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && txnNameFromHash(n.transaction?.hash) === getFulfillingTransactionName(fixtureID)).length > 0) {
            setFulfillingTransactionState(fixtureID, "Success");
        };

        // Staking or unstaking transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && txnNameFromHash(n.transaction?.hash) === getFulfillingTransactionName(fixtureID)).length > 0) {
            setFulfillingTransactionState(fixtureID, "Fail");
        };
    }, [notifications, fixtureID]);
}