import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { config } from '../../App';
import { fetchFixtures, fetchTeams } from '../../services/sportsOracleService';
import { DatedFixtureListComponent } from '../datedFixtureListComponent/datedFixtureListComponent';

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
    }
}));

export const Body = () => {
    const classes = useStyles();
    const { chainId } = useEthers()

    // TODO: Parametrize these
    const startDate = new Date(2022, 8, 12);
    const endDate = new Date(2022, 8, 14);

    const [isValidChain, setIsValidChain] = useState<boolean>();

    useEffect(() => {
        const isValid: boolean = chainId != null && config.readOnlyUrls != null && config?.readOnlyUrls[chainId] != null;
        setIsValidChain(isValid);
    }, [chainId]);

    useEffect(() => {
        fetchFixtures();
        fetchTeams();
    }, []);

    return (
        <Box>
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