import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "0.5em",
        textAlign: 'center',
    },
    takingTooLong: {
        fontSize: "0.85em",
    },
}));

export interface OpeningStakeComponentProps {
    fixture: Fixture,
};

export const OpeningStakeComponent = (props: OpeningStakeComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            Hold tight! This fixture is being opened for betting...
            <div className={classes.takingTooLong}>
                <p>
                    Taking too long? Click below to retry opening the fixture
                </p>
                <div>
                    <OpenFixtureButtonComponent fixture={props.fixture}/>
                </div>
            </div>
        </div>
    );
}