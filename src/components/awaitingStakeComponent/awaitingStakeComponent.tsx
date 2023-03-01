import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../redux/store";
import { FulfillResultButtonComponent } from '../fulfillResultButtonComponent/fulfillResultButtonComponent';

const PREFIX = 'AwaitingStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    info: `${PREFIX}-info`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        marginTop: "1em",
        textAlign: "center",
    },

    [`& .${classes.info}`]: {
        fontSize: "1em",
        marginBottom: "0.6em",
    }
}));

export type AwaitingStakeComponentProps = {
    fixtureID: string;
}

export const AwaitingStakeComponent = (props: AwaitingStakeComponentProps) => {


    const fixtures = useTypedSelector((state) => state.fixtures);
    const [fixtureHasResult, setFixtureHasResult] = useState<boolean>(false);
    useEffect(() => {
        const hasResult = fixtures[props.fixtureID] != null && fixtures[props.fixtureID].result != null;
        setFixtureHasResult(hasResult);
    })

    return (
        <Root className={classes.container}>
            <div className={classes.info}>
                <p>
                    Betting has closed while we await the fixture result.
                </p>
                <p>
                    When we detect the fixture result is available, you will be able to click the button below to fulfill the fixture result.
                </p> 
            </div>
            <div>
                <FulfillResultButtonComponent fixtureID={props.fixtureID} disabled={!fixtureHasResult}/>
            </div>
        </Root>
    );
}