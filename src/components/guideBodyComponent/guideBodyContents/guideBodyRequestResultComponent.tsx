import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        image: "/closedfixture.png",
        text: "1. Click the Open button on a fixture to open it. Sign the transaction from your browser wallet.",
    },
    {
        image: "/fixtureopening.png",
        text: "2. You will see this screen while the fixture opens.",
    },
    {
        image: "/newlyopenedfixture.jpg",
        text: "3. When the fixture opens, you will be able to begin transferring stakes!",
    }
]

export const GuideBodyRequestResultComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)