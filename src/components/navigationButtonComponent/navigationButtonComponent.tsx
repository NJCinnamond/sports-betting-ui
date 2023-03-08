import { Button } from "@mui/material";
import { Page } from "../../redux/reducers/view";
import { setPage } from "../../services/viewService";

export interface NavigationButtonComponentProps {
    page: Page,
    label: string,
    size: "small" | "medium" | "large" | undefined,
}

export const NavigationButtonComponent = (props: NavigationButtonComponentProps) => {
    const onClick = () => {
        setPage(props.page);
    }
    return (
        <Button onClick={onClick} variant="contained" size={props.size}>
            {props.label}
        </Button>
    );
}