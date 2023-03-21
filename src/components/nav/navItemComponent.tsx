import { styled } from '@mui/material/styles';
import { Page } from '../../redux/reducers/view';
import { useTypedSelector } from '../../redux/store';
import { setPage } from '../../services/viewService';

const PREFIX = 'NavItemComponent';

const classes = {
    itemText: `${PREFIX}-itemText`,
    selectedItemText: `${PREFIX}-selectedItemText`,
};

const Root = styled('div')((
    {
        theme,
    }
) => ({
    [`&.${classes.itemText}`]: {
        textAlign: 'center',
        height: "100%",
        cursor: "pointer",
        marginLeft: "1.7em",
        fontSize: "1.1em",
    },
    [`&.${classes.selectedItemText}`]: {
        textAlign: 'center',
        fontWeight: '500',
        height: "100%",
        cursor: "pointer",
        marginLeft: "1.7em",
        fontSize: "1.1em",
    },
}));

export interface NavItemComponentProps {
    text: string,
    page: Page,
} 

export const NavItemComponent = (props: NavItemComponentProps) => {

    const onClick = () => {
        setPage(props.page);
    }

    const isCurrentPage = useTypedSelector((state) => state.view.page) == props.page;

    const textCSS = isCurrentPage ? classes.selectedItemText : classes.itemText;

    return (
        <Root className={textCSS}>
            <a onClick={onClick}>
                {props.text}
            </a>
        </Root>
    );
}