import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { StakeSummary } from "../../$types/fixtureEnrichment";
import { BetType } from "../../$types/betType";
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Team } from "../../$types/team";

Chart.register(ArcElement, Tooltip);

export interface StakeChartComponentProps {
    stakes: StakeSummary,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    stakeInsight: {
        textAlign: 'center',
        position: "relative",
        height: "100%",
    },
}));

export const StakeChartComponent = (props: StakeChartComponentProps) => {
    const classes = useStyles();

    const homeLabel = props.homeTeam.long_name.toUpperCase();
    const drawLabel = "DRAW";
    const awayLabel = props.awayTeam.long_name.toUpperCase();

    const data = {
        labels: [homeLabel, drawLabel, awayLabel],
        datasets: [
            {
                label: 'Stakes By BetType',
                data: [
                    props.stakes[BetType.HOME],
                    props.stakes[BetType.DRAW],
                    props.stakes[BetType.AWAY]
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: "white",
                    boxWidth: 20,
                    padding: 20
                }
            }
        }
    }; 

    return (
        <div className={classes.stakeInsight}>
            <Pie data={data} options={{ maintainAspectRatio: false, responsive: true }}/>
        </div>
    );
}