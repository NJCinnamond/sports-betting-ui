import { styled } from '@mui/material/styles';
import { Page } from '../../redux/reducers/view';
import { setPage } from '../../services/viewService';

const PREFIX = 'NavBrandComponent';

const classes = {
    brandText: `${PREFIX}-brandText`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.brandText}`]: {
        textAlign: 'center',
        position: "relative",
        height: "100%",
        fontSize: "1.6em",
        marginRight: "1em",
        cursor: "pointer",
    }
}));

export const NavBrandComponent = () => {

    const onClick = () => {
        setPage(Page.HOME);
    }

    return (
        <Root className={classes.brandText}>
            <a onClick={onClick}>
                Sweeper
            </a>
        </Root>
    );
}