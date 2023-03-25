import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        text: <span>To get USDC, you can use any trusted exchange such as Uniswap to swap tokens. You can use the Arbitrum bridge to transfer to Arbitrum.</span>
    },
]

export const GuideERC20Component = () => (
    <GuideBodyStepsComponent steps={steps}/>
)