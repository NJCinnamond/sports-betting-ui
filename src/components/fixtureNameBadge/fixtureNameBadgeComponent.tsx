import { styled } from '@mui/material/styles';

const PREFIX = 'FixtureNameBadgeComponent';

const classes = {
    fixtureTeam: `${PREFIX}-fixtureTeam`,
    displayName: `${PREFIX}-displayName`,
    crestContainer: `${PREFIX}-crestContainer`,
    crest: `${PREFIX}-crest`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.fixtureTeam}`]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    [`& .${classes.displayName}`]: {
        width: "4em",
        fontWeight: 500,
        fontSize: "1.1em",
        textAlign: "center",
    },

    [`& .${classes.crestContainer}`]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "4em",
    },

    [`& .${classes.crest}`]: {
        width: "2.5em",
        maxHeight: "4em",
    }
}));

export interface FixtureNameBadgeComponentProps {
    displayName: string | undefined,
    crest: string | undefined,
    home: boolean,
}

export const FixtureNameBadgeComponent = (props: FixtureNameBadgeComponentProps) => {
    return (
        <Root className={classes.fixtureTeam}>
            {!props.home && (
                <div className={classes.crestContainer}>
                    <img className={classes.crest} src={props.crest}></img>
                </div>
            )}
            <span className={classes.displayName}>
                {props.displayName}
            </span>
            {props.home && (
                <div className={classes.crestContainer}>
                    <img className={classes.crest} src={props.crest}></img>
                </div>
            )}
        </Root>
    );
}