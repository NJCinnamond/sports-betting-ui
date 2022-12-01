import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from "@mui/material";
import moment from "moment";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { FixtureNameBadgeComponent } from '../fixtureNameBadge/fixtureNameBadgeComponent';

const PREFIX = 'FixtureInfoComponent';

const classes = {
    container: `${PREFIX}-container`,
    fixtureTimeBox: `${PREFIX}-fixtureTimeBox`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "4em",
        [theme.breakpoints.down(460)]: {
            fontSize: '3.5vw',
        },
    },

    [`& .${classes.fixtureTimeBox}`]: {
        margin: "0 3em",
        backgroundColor: "grey",
        padding: "0.6em",
        borderRadius: "5px",
        fontWeight: "bold",
        color: theme.palette.common.white
    }
}));

export interface FixtureInfoComponentProps {
    fixture: Fixture | undefined,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
}

const theme = createTheme(adaptV4Theme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 300,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
}));

export const FixtureInfoComponent = (props: FixtureInfoComponentProps) => {

    const formatKickoffTime = (ko: number | undefined) => {
        let kickoffTime = '';
        if (ko) {
            const date = new Date(ko * 1000);
            kickoffTime = moment(date).format('HH:mm');
        }
        return kickoffTime;
    };

    return (
        <StyledBox className={classes.container}>
            <div>
                <FixtureNameBadgeComponent displayName={props.homeTeam?.short_name} crest={props.homeTeam?.crest_url} home={true}></FixtureNameBadgeComponent>
            </div>
            <Box className={classes.fixtureTimeBox}>
                {formatKickoffTime(props.fixture?.ko)}
            </Box>
            <div>
                <FixtureNameBadgeComponent displayName={props.awayTeam?.short_name} crest={props.awayTeam?.crest_url} home={false}></FixtureNameBadgeComponent>
            </div>
        </StyledBox>
    );
}