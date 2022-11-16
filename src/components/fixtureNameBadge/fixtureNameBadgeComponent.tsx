import { autocompleteClasses, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";

export interface FixtureNameBadgeComponentProps {
    displayName: string | undefined,
    crest: string | undefined,
    home: boolean,
};

const useStyles = makeStyles((theme) => ({
    fixtureTeam: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    displayName: {
        padding: "0 2em",
        width: "4em",
        fontWeight: 500,
        fontSize: "1.1em"
    },
    crestContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "4em",
    },
    crest: {
        width: "2em",
        maxHeight: "3em",
    }
}));

export const FixtureNameBadgeComponent = (props: FixtureNameBadgeComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.fixtureTeam}>
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
        </div>
    );
}