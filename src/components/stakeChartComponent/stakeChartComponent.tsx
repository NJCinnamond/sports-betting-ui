import { styled } from '@mui/material/styles';
import { StakeSummary } from "../../$types/fixtureEnrichment";
import { BetType } from "../../$types/betType";
import { ArcElement, Chart, Tooltip } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Team } from "../../$types/team";

const PREFIX = 'StakeChartComponent';

const classes = {
    stakeInsight: `${PREFIX}-stakeInsight`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.stakeInsight}`]: {
        textAlign: 'center',
        position: "relative",
        height: "95%",
        margin: "auto",
        paddingTop: "1em"
    }
}));

Chart.register(ArcElement, Tooltip);

export interface StakeChartComponentProps {
    stakes: StakeSummary,
    homeTeam: Team,
    awayTeam: Team
}

export const StakeChartComponent = (props: StakeChartComponentProps) => {


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
        <Root className={classes.stakeInsight}>
            <Pie data={data} options={{ maintainAspectRatio: false, responsive: true }}/>
        </Root>
    );
}