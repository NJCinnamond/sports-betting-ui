import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        image: "/result.png",
        text: <>
            <p>
                <span>When a fixture result is received, addresses that staked on the correct result will be able to claim a Payout by clicking the Payout button opposite.</span>
            </p>
        </>
    },
    {
        text: <span>If a fixture was cancelled or could not be played for whatever reason, all stakers will be able to click Refund to request their stakes back.</span>
    }
]

export const GuideBodyPayoutComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)