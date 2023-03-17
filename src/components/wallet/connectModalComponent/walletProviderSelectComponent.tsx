import { Button, styled } from "@mui/material";

const PREFIX = 'WalletProviderSelectComponent';

const classes = {
    selector: `${PREFIX}-selector`,
    label: `${PREFIX}-label`,
    button: `${PREFIX}-button`,
};

const Selector = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.selector}`]: {
        display: "flex",
        marginBottom: "1em",
        fontFamily: "Verdana",
    },

    [`& .${classes.label}`]: {
        textAlign: "left",
        color: "black",
        fontWeight: "600",
        fontSize: "1.4em",
        textTransform: "none"
    },

    [`& .${classes.button}`]: {
        width: "auto",
        flexGrow: "1",
        [`& img`]: {
            float: "left",
            height: "50px",
            margin: "0 .5em"
        }
    },
}));

interface WalletProviderSelectComponentProps {
    provider: string;
    onClick: (provider:string) => any;
    label: string;
    img: string;
}

export const WalletProviderSelectComponent = (props: WalletProviderSelectComponentProps) => {
    return (
        <Selector className={classes.selector}>
            <Button 
                className={classes.button}
                onClick={() => props.onClick(props.provider)} 
                variant="outlined" 
                sx={ { borderRadius: 8, backgroundColor: "#e4eaf5", height: "100px", minWidth: "auto" } }
            >  
                <img src={props.img}/>
                <span className={classes.label}>{props.label}</span>
            </Button>
        </Selector>
    )
}