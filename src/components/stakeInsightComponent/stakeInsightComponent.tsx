import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { StakeSummary } from "../../$types/fixtureEnrichment";
import { BetType } from "../../$types/betType";
import { ArcElement, Chart } from 'chart.js';
import { Doughnut, Pie } from "react-chartjs-2";

Chart.register(ArcElement);

export interface StakeInsightComponentProps {
    stakes: StakeSummary
};

const useStyles = makeStyles((theme) => ({
    stakeInsight: {
        textAlign: 'center',
        position: "relative",
        height: "20vh",
    },
}));

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const classes = useStyles();

    console.log("Stake summary: ", props.stakes);

    const data = {
        labels: ['Home', 'Draw', 'Away'],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    props.stakes[BetType.HOME],
                    props.stakes[BetType.DRAW],
                    props.stakes[BetType.AWAY]
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    }; 

    /*
    <Box className={classes.stakeInsight}>
            <p>HOME: {props.stakes ? props.stakes[BetType.HOME] : ''}</p>
            <p>DRAW: {props.stakes ? props.stakes[BetType.DRAW] : ''}</p>
            <p>AWAY: {props.stakes ? props.stakes[BetType.AWAY] : ''}</p>
        </Box>
        */
    return (
        <div className={classes.stakeInsight}>
            <Pie width={"70%"} data={data} options={{ maintainAspectRatio: false, responsive: true }}/>
        </div>
    );
}