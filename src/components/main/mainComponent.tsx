import { styled } from '@mui/material/styles';
import { Body } from '../body/bodyComponent';

const PREFIX = 'Main';

const classes = {
    title: `${PREFIX}-title`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.title}`]: {
        color: theme.palette.common.white,
        textAlign: "center",
        fontSize: "2.5em",
        fontWeight: "bold"
    }
}));

export const Main = () => {

    return (
        (<Root>
            <div className={classes.title}>
                Soccer Stakes
            </div>
            <Body />
        </Root>)
    );
}