import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { DatedFixtureListComponent } from '../datedFixtureListComponent/datedFixtureListComponent';

export type BettingTab = {
    name: string
};

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
    },
    header: {
        color: "white"
    }
}));

export const Body = () => {
    const classes = useStyles();

    const startDate = new Date(2022, 8, 12);
    const endDate = new Date(2022, 8, 14);

    return (
        <Box>
            <Box className={classes.box}>
                <DatedFixtureListComponent startDate={startDate} endDate={endDate}></DatedFixtureListComponent>
            </Box>
        </Box>
    )
}