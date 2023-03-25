import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        image: "/selectfixture.gif",
        text: "1. Click on the fixture that you want to stake on in the fixture grid.",
    },
    {
        image: "/approvedai.gif",
        text: <>
            <p>
                {"2. In the staking panel, click the outcome you want to stake on and enter the stake amount"}</p>
            <p>
                {"You may need to approve the contract to transfer your USDC."}
            </p>
            <p>
                {"If you don't have USDC, see this page's section on getting USDC."}
            </p>
            <p>
                {"If the fixture isn't open, see How to open fixtures below."}
            </p>
        </>,
    },
    {
        image: "/clickstake.gif",
        text: "3. Ensure your entered USDC value is correct and click stake",
    },
    {
        image: "/stakecomplete.png",
        text: "4. Your stake should now appear on the staking panel",
    }
]

export const GuideBodyStakingComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)