import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        image: "/selectfixture.gif",
        text: "1. Click on the fixture that you want to stake on.",
    },
    {
        image: "/salah.jpg",
        text: "2. Approve the contract to transfer your DAI. See how to get DAI. If the fixture isn't open, see How to open fixtures below.",
    },
    {
        image: "/salah.jpg",
        text: "3. Click the outcome you want to stake on.",
    },
    {
        image: "/salah.jpg",
        text: "4. Enter DAI value and click stake",
    }
]

export const GuideBodyStakingComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)