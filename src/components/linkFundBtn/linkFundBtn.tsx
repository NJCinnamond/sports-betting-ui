import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { LinkFundModal } from '../linkFundModal/linkFundModal';

export type LinkFundBtnProps = {
    disabled: boolean,
}

export const LinkFundBtn = (props: LinkFundBtnProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Box sx={{ m: "2rem" }}>
                <Button disabled={props.disabled} color="primary" variant="contained" onClick={handleOpen}>Fund with Link</Button>
            </Box>
            <LinkFundModal open={open} handleClose={handleClose}></LinkFundModal>
        </div>
    )
};
