import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import { Team } from "../../$types/team";
import { TotalStakeChartComponent } from "../totalStakeChartComponent/totalStakeChartComponent";
import { StakeInsightTableComponent } from "../stakeInsightTableComponent/stakeInsightTableComponent";
import { Box } from '@mui/material';

const PREFIX = 'StakeInsightComponent';

const classes = {
    stakeInsightRowContainer: `${PREFIX}-stakeInsightRowContainer`,
    stakeInsightColumContainer: `${PREFIX}-stakeInsightColumContainer`,
    stakeInsightChartItem: `${PREFIX}-stakeInsightChartItem`,
    stakeInsightTableItem: `${PREFIX}-stakeInsightTableItem`,
};

const Root = styled(Box)((
    {
        theme
    }
) => ({
    [`&.${classes.stakeInsightRowContainer}`]: {
        display: 'flex',
        justifyContent: "space-around",
    },

    [`&.${classes.stakeInsightColumContainer}`]: {
        display: "flex",
        flexDirection: "column",
    },

    [`& .${classes.stakeInsightChartItem}`]: {
        flexBasis: "40%",
        maxWidth: "40%"
    },

    [`& .${classes.stakeInsightTableItem}`]: {
        flexBasis: "50%",
        maxWidth: "60%"
    },
}));

export interface StakeInsightComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
}

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' });

    return (
        <Root className={isTabletOrMobile ? classes.stakeInsightColumContainer : classes.stakeInsightRowContainer}>
            <div className={isTabletOrMobile ? '' : classes.stakeInsightChartItem}>
                <TotalStakeChartComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
            <div className={isTabletOrMobile ? '' : classes.stakeInsightTableItem}>
                <StakeInsightTableComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
        </Root>
    );
};