import { Button } from "@mui/material";

export interface GameweekFixtureListHeaderComponent {
    gameweek: number;
    setGameweek: (gameweek: number) => void;
}

export const GameweekFixtureListHeaderComponent = (props: GameweekFixtureListHeaderComponent) => {

    const onPreviousClick = () => props.setGameweek(props.gameweek - 1);
    const onNextClick = () => props.setGameweek(props.gameweek + 1);

    return (
        <div>
            <Button onClick={onPreviousClick} disabled={props.gameweek == 1}>{"<"}</Button>
            <span>Gameweek {props.gameweek}</span>
            <Button onClick={onNextClick} disabled={props.gameweek == 38}>{">"}</Button>
        </div>
    )
}