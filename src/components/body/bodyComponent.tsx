import React, { useEffect, useState } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core";
import { FixtureListComponent } from '../fixtureListComponent/fixtureListComponent';
import { fetchFixtures } from '../../services/SportsOracleService';

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

    return (
        <Box>
            <Box className={classes.box}>
                <FixtureListComponent></FixtureListComponent>)
            </Box>
        </Box>
    )
}