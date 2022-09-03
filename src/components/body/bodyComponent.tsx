import React, { useEffect, useState } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core";
import { FixtureListComponent } from '../fixtureListComponent/fixtureListComponent';
import { fetchFixturesJSON } from '../../services/SportsOracleService';
import { Fixture } from '../../types/Fixture';

export type BettingTab = {
    name: string
};

const useStyles = makeStyles((theme) => ({
    tabHeaders: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4),
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
    },
    header: {
        color: "white"
    }
}));

const bettingTabs: Array<BettingTab> = [
    {
        name: "Fixtures"
    },
    {
        name: "History"
    },
]

export const Body = () => {
    const [fixtures, setFixtures] = useState<Fixture[] | undefined>();
    const classes = useStyles();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTabIndex(parseInt(newValue));
    };

    useEffect(() => {
        const fetchFixtures = async () => {
            const fixtures: Fixture[] | undefined = await fetchFixturesJSON();
            setFixtures(fixtures);
            console.log("fixtures", fixtures);
        }
        fetchFixtures();
    }, [])

    return (
        <Box>

            <Box className={classes.box}>
                <TabContext value={selectedTabIndex.toString()}>
                    <div className={classes.tabHeaders}>
                        <TabList onChange={handleTabChange}>
                            {bettingTabs.map((tab, index) => {
                                return (
                                    <Tab label={tab.name} value={index.toString()} key={index}>
                                    </Tab>
                                )
                            })}
                        </TabList>
                    </div>
                    {bettingTabs.map((tab, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                {tab.name == "Fixtures" && (<FixtureListComponent fixtures={fixtures}></FixtureListComponent>)}
                                {tab.name == "History" && (<>Hi!</>)}
                            </TabPanel>
                        );
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}