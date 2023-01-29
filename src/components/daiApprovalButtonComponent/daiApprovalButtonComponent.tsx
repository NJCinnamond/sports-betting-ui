import { Button, CircularProgress } from "@mui/material";
import { useDAIApproval } from "../../hooks/stake";
import { ERC20ApprovalButtonComponent } from "../erc20ApprovalButtonComponent/erc20ApprovalButtonComponent";
import './daiApprovalButtonComponent.css';

export interface DaiApprovalButtonComponentProps {
    disabled: boolean
}

export const DaiApprovalButtonComponent = (props: DaiApprovalButtonComponentProps) => {
    const { approveState, approve } = useDAIApproval();

    return (
        <ERC20ApprovalButtonComponent
            disabled={props.disabled}
            approveAction={approve}
            approveState={approveState}
            tokenName={"DAI"}
        />
    );
}