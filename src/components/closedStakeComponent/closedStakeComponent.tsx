import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";
import { useEthers } from "@usedapp/core";

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

    const { account } = useEthers();

    return (
        <Box className={classes.container}>
            {!account && (<div className={classes.section}>
                This fixture is currently closed. To request to Open it, please connect your wallet.
            </div>)}
            {account && (<div className={classes.section}>
                This fixture is currently closed. Click below to request to Open it.
            </div>)}
            <div className={classes.section}>
                <OpenFixtureButtonComponent fixture={props.fixture}/>
            </div>
        </Box >
    );
}