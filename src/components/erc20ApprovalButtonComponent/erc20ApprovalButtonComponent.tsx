import { Button, CircularProgress } from "@mui/material";
import { TransactionStatus } from "@usedapp/core";
import './erc20ApprovalButtonComponent.css';

export interface ERC20ApprovalButtonComponentProps {
    disabled: boolean,
    approveAction: () => {},
    approveState: TransactionStatus,
    tokenName: string,
}

export const ERC20ApprovalButtonComponent = (props: ERC20ApprovalButtonComponentProps) => (
    <Button
        className='approval-btn'
        color="primary"
        variant="contained"
        onClick={props.approveAction}
        disabled={props.disabled || props.approveState.status == 'PendingSignature' || props.approveState.status == 'Mining'}
    >
        {props.approveState.status == 'PendingSignature' && (
            <span>Approve in wallet</span>
        )}
        {props.approveState.status == 'Mining' && (
            <>
                <CircularProgress size={26} />
                <span className='mining-text'>Approving</span>
            </>
        )}
        {props.approveState.status != 'Mining' && props.approveState.status != 'PendingSignature' && (
            <span>APPROVE USE OF {props.tokenName}</span>
        )}
    </Button>  
);