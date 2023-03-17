import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        image: "/closedfixture.png",
        text: "1. Click the Open button on a fixture to open it. Sign the transaction from your browser wallet.",
    },
    {
        image: "/salah.jpg",
        text: "2. If the fixture is open, approve DAI spend. See how to get DAI. If it isn't open, see How to open fixtures below.",
    },
    {
        image: "/salah.jpg",
        text: "3. Click the outcome you want to stake on. Enter DAI value and click stake",
    }
]

export const GuideOpeningFixtureComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)