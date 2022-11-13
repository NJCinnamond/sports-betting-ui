import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { config } from '../../App';
import { useTypedSelector } from '../../redux/store';
import { fetchFixtures, fetchTeams } from '../../services/sportsOracleService';
import { DatedFixtureListComponent } from '../datedFixtureListComponent/datedFixtureListComponent';
import { ParentStakePanelComponent } from '../parentStakePanelComponent/parentStakePanelComponent';

export type BettingTab = {
    name: string
};

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
        margin: "2vh 0"
    },
    header: {
        color: "white"
    },
    invalidChainBox: {
        padding: "1em",
        textAlign: "center",
    },
    stakePanelContainer: {
        padding: "1em",
    }
}));

export const Body = () => {
    const classes = useStyles();
    const { chainId } = useEthers();

    // Redux store for selected fixture view
    const view = useTypedSelector((state) => state.view);

    // TODO: Parametrize these
    const startDate = new Date(2022, 9, 20);
    const endDate = new Date(2022, 11, 14);

    const [isValidChain, setIsValidChain] = useState<boolean>();

    useEffect(() => {
        if (chainId != null) {
            const isValid: boolean = chainId != null && config.readOnlyUrls != null && config?.readOnlyUrls[chainId] != null;
            setIsValidChain(isValid);
        }
    }, [chainId]);

    useEffect(() => {
        fetchFixtures();
        fetchTeams();
    }, []);

    // TODO: Separate these into two separate components
    return (
        <Box>
            {isValidChain && (
                <Box className={classes.box}>
                    {view.selected && (
                        <div className={classes.stakePanelContainer}>
                            <ParentStakePanelComponent fixture={view.selected} />
                        </div>
                    )}
                    {!view.selected && (
                        <div className={classes.invalidChainBox}>
                            Select a fixture to begin staking.
                        </div>
                    )}
                </Box>
            )}
            <Box className={classes.box}>
                {isValidChain && (
                    <DatedFixtureListComponent startDate={startDate} endDate={endDate}></DatedFixtureListComponent>
                )}
                {!isValidChain && (
                    <div className={classes.invalidChainBox}>
                        Please use Mainnet or Goerli test net.
                    </div>
                )}
            </Box>
        </Box>
    )
}