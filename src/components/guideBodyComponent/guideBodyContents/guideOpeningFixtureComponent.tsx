import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        text: "This section assumes you have funded the contract with LINK from your address. Use the Fund Link page to send LINK to the contract if you have not done so already."
    },
    {
        image: "/closedfixture.png",
        text: "1. Click the Open button on a fixture to open it. Sign the transaction from your browser wallet.",
    },
    {
        image: "/fixtureopening.png",
        text: "2. You will see this screen while the fixture opens.",
    },
    {
        image: "/newlyopenedfixture.png",
        text: "3. When the fixture opens, you will be able to begin transferring stakes!",
    },
    {
        text: "When a fixture reaches full-time, you will be able to request that the result is retrieved by the contract. This step must be completed before users can withdraw winnings.",
    },
    {
        image: "/fulfillbutton.png",
        text: "To do so, simply click the FULFILL button, which will fetch the fixture result.",
    },
]

export const GuideOpeningFixtureComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)