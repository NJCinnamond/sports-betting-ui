import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        text: <span>To get DAI, you can use any trusted exchange such as Uniswap to swap tokens. You can use the Arbitrum bridge to transfer to Arbitrum.</span>
    },
]

export const GuideDAIComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)