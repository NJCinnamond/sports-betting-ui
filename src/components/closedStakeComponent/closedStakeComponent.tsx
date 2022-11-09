import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";

export interface ClosedStakeComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    section: {
        margin: "0.5em",
        textAlign: "center"
    },
}));

export const ClosedStakeComponent = (props: ClosedStakeComponentProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <div className={classes.section}>
                This fixture is currently closed. To request to open it, press the button below.
            </div>
            <div className={classes.section}>
                <OpenFixtureButtonComponent fixture={props.fixture}/>
            </div>
        </Box >
    );
}