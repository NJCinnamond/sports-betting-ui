import React, { useState } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core";

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
        name: "My Stakes"
    },
]

export const Body = () => {
    const classes = useStyles();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTabIndex(parseInt(newValue));
    };

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
                                <div className={classes.tabContent}>
                                    {tab.name} will appear here.
                                </div>
                            </TabPanel>
                        );
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}