import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import FixtureService from "../../services/fixtureService";
import { dateToUTCString } from "../../utils/dateUtils";
import { FixtureListComponent } from "../fixtureListComponent/fixtureListComponent";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";
import { FixturesByDate } from '../../redux/reducers/fixtures';

const PREFIX = 'DatedFixtureListComponent';

const classes = {
    title: `${PREFIX}-title`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.title}`]: {
        textAlign: "center",
        padding: "1em 0",
        fontWeight: "bold",
        fontSize: "1.1em",
    }
}));

export interface DatedFixtureListComponentProps {
    fixturesByDate: FixturesByDate | undefined
}


export const DatedFixtureListComponent = (props: DatedFixtureListComponentProps) => {
    const formatDate = (date: string) => dateToUTCString(new Date(Date.parse(date)));
    return (
        (<Root>
            {props.fixturesByDate && Object.entries(props.fixturesByDate)
                .map(([date, fixtures]) => (
                    <div key={date}>
                        <div className={classes.title}>{formatDate(date)}</div>
                        <FixtureListComponent fixtureIDs={fixtures}></FixtureListComponent>
                    </div>
                ))
            }
        </Root>)
    );
}