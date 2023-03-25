import { useUSDCApproval } from "../../hooks/stake";
import { ERC20ApprovalButtonComponent } from "../erc20ApprovalButtonComponent/erc20ApprovalButtonComponent";
import './usdcApprovalButtonComponent.css';

export interface USDCApprovalButtonComponentProps {
    disabled: boolean
}

export const USDCApprovalButtonComponent = (props: USDCApprovalButtonComponentProps) => {
    const { approveState, approve } = useUSDCApproval();

    return (
        <ERC20ApprovalButtonComponent
            disabled={props.disabled}
            approveAction={approve}
            approveState={approveState}
            tokenName={"USDC"}
        />
    );
}