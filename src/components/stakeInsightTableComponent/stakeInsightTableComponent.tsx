import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FixtureEnrichment } from '../../$types/fixtureEnrichment';
import { BetType } from '../../$types/betType';
import { Team } from '../../$types/team';
import { makeStyles } from '@material-ui/core';

export interface StakeInsightTableComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
}

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: "auto",
    },
}));

export const StakeInsightTableComponent = (props: StakeInsightTableComponentProps) => {
    const classes = useStyles();

    const createData = (
        betType: BetType,
        total: number,
        user: number,
    ) => {
        let betTypeStr = '';
        if (betType == BetType.HOME) {
            betTypeStr = props.homeTeam.short_name + " WIN";
        } else if (betType == BetType.AWAY) {
            betTypeStr = props.awayTeam.short_name + " WIN";
        } else {
            betTypeStr = "DRAW";
        }
        return { betTypeStr, total, user };
    }

    const rows = [
        createData(BetType.HOME, props.enrichment?.total[BetType.HOME], props.enrichment?.user[BetType.HOME]),
        createData(BetType.DRAW, props.enrichment?.total[BetType.DRAW], props.enrichment?.user[BetType.DRAW]),
        createData(BetType.AWAY, props.enrichment?.total[BetType.AWAY], props.enrichment?.user[BetType.AWAY]),
    ];

    return (
        <div className={classes.table}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Result</TableCell>
                            <TableCell align="right">Total Bets</TableCell>
                            {props.enrichment?.user && (
                                <TableCell align="right">Your Bets</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.betTypeStr}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.betTypeStr}
                                </TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                {props.enrichment?.user && (
                                    <TableCell align="right">{row.user}</TableCell>                            
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}