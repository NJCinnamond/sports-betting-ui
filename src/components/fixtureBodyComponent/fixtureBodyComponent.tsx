import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { config } from '../../App';
import { useTypedSelector } from '../../redux/store';
import { fetchTeams } from '../../services/sportsOracleService';
import { GameweekFixtureListComponent } from '../gameweekFixtureListComponent/gameweekFixtureListComponent';
import { ParentStakePanelComponent } from '../parentStakePanelComponent/parentStakePanelComponent';

const PREFIX = 'FixtureBody';

const classes = {
    box: `${PREFIX}-box`,
    header: `${PREFIX}-header`,
    invalidChainBox: `${PREFIX}-invalidChainBox`,
    stakePanelContainer: `${PREFIX}-stakePanelContainer`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    maxWidth: "800px",
    margin: "auto",
    [`& .${classes.box}`]: {
        backgroundColor: "white",
        borderRadius: "25px",
        margin: "2vh 0",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "rgba(1,1,1,0.1)"
    },

    [`& .${classes.header}`]: {
        color: "white"
    },

    [`& .${classes.invalidChainBox}`]: {
        padding: "1em",
        textAlign: "center",
    },

    [`& .${classes.stakePanelContainer}`]: {
        padding: "0.8em",
    }
}));

export type BettingTab = {
    name: string
};

export const FixtureBodyComponent = () => {

    const { chainId, account } = useEthers();

    // Redux store for selected fixture view
    const view = useTypedSelector((state) => state.view);

    const isValidChain: boolean = chainId != null && config.readOnlyUrls != null && config?.readOnlyUrls[chainId] != null;
    const shouldShowBody = (!account || (account && isValidChain));

    useEffect(() => {
        fetchTeams();
    }, []);

    // TODO: Separate these into two separate components
    return (
        <StyledBox>
            {shouldShowBody && (
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
                {shouldShowBody && (
                    <GameweekFixtureListComponent/>
                )}
                {!shouldShowBody && (
                    <div className={classes.invalidChainBox}>
                        Please use Arbitrum or Arbitrum Goerli test net.
                    </div>
                )}
            </Box>
        </StyledBox>
    );
}