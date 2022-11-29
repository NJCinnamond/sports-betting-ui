import { useBlockExplorerForTxn } from "../../hooks/explorer";
import { TransactionEntryType } from "../../redux/reducers/transactions";
import { useTypedSelector } from "../../redux/store";

export interface TransactionLinkComponentProps {
    txnName: string,
}

export const TransactionLinkComponent = (props: TransactionLinkComponentProps) => {
    const transactions = useTypedSelector((state) => state.transactions); 
    const txnHash = transactions[TransactionEntryType.NAME][props.txnName];
    const explorerURL = useBlockExplorerForTxn(txnHash);

    return (
        <span>
            <a href={explorerURL} target="_blank" rel="noopener noreferrer">{txnHash.slice(0,15)}...</a>
        </span>
    );
}