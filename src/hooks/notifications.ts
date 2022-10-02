import { useNotifications } from "@usedapp/core";
import { useEffect } from "react";
import { getOpeningFixtureTransactionName, getStakingTransactionName } from "../services/notificationService";
import { setOpeningTransactionState, setStakingTransactionState } from "../services/viewService";

export const useFixtureNotifications = (fixtureID: string) => {
    const { notifications } = useNotifications();

    useEffect(() => {
        // Opening fixture transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            setOpeningTransactionState(fixtureID, "Mining");
        };

        // Opening fixture transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && n.transactionName === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            setOpeningTransactionState(fixtureID, "Success");
        };

        // Opening fixture transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getOpeningFixtureTransactionName(fixtureID)).length > 0) {
            setOpeningTransactionState(fixtureID, "Fail");
        };

        // Staking or unstaking transaction started
        if (notifications.filter((n) => n.type === "transactionStarted" && n.transactionName === getStakingTransactionName(fixtureID)).length > 0) {
            setStakingTransactionState(fixtureID, "Mining");
        };

        // Staking or unstaking transaction success
        if (notifications.filter((n) => n.type === "transactionSucceed" && n.transactionName === getStakingTransactionName(fixtureID)).length > 0) {
            setStakingTransactionState(fixtureID, "Success");
        };

        // Staking or unstaking transaction failed
        if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === getStakingTransactionName(fixtureID)).length > 0) {
            setStakingTransactionState(fixtureID, "Fail");
        };
    }, [notifications]);
}