import { styled } from '@mui/material/styles';
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";

const PREFIX = 'OpeningStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    takingTooLong: `${PREFIX}-takingTooLong`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        margin: "0.5em",
        textAlign: 'center',
    },

    [`& .${classes.takingTooLong}`]: {
        fontSize: "0.85em",
    }
}));

export interface OpeningStakeComponentProps {
    fixture: Fixture,
}

export const OpeningStakeComponent = (props: OpeningStakeComponentProps) => {


    return (
        <Root className={classes.container}>
            Hold tight! This fixture is being opened for betting...
            <div className={classes.takingTooLong}>
                <p>
                    Taking too long? Click below to retry opening the fixture
                </p>
                <div>
                    <OpenFixtureButtonComponent fixture={props.fixture}/>
                </div>
            </div>
        </Root>
    );
}