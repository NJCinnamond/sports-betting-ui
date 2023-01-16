import { Button } from "@mui/material";
import { Page } from "../../redux/reducers/view";
import { setPage } from "../../services/viewService";


export const FixtureNavigationButtonComponent = () => {
    const onClick = () => {
        setPage(Page.FIXTURES);
    }
    return (
        <Button onClick={onClick} variant="contained">
            VIEW FIXTURES
        </Button>
    );
}