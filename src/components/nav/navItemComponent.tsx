import { styled } from '@mui/material/styles';
import { Page } from '../../redux/reducers/view';
import { setPage } from '../../services/viewService';

const PREFIX = 'NavItemComponent';

const classes = {
    itemText: `${PREFIX}-itemText`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.itemText}`]: {
        textAlign: 'center',
        height: "100%",
        cursor: "pointer",
        marginLeft: "1em",
    }
}));

export interface NavItemComponentProps {
    text: string,
    page: Page,
} 

export const NavItemComponent = (props: NavItemComponentProps) => {

    const onClick = () => {
        setPage(props.page);
    }

    return (
        <Root className={classes.itemText}>
            <a onClick={onClick}>
                {props.text}
            </a>
        </Root>
    );
}