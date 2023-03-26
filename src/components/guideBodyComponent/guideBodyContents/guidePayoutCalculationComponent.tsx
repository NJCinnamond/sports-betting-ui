import { GuideBodyStepsComponent } from "../guideBodyStepsComponent"

const steps = [
    {
        text: <>
            <p>
                <span>Let's use an example with nice numbers. Say we have a fixture, Brighton v Chelsea, with 3 stakers, User 1, User 2 and User 3.</span>
            </p>
            <p>
                <span>Now suppose each User has bet 2 USDC. User 1 bet 2 USDC on Chelsea to win, whereas User 2 and User 3 each bet 2 USDC on a Draw.</span>
            </p>
        </>
    },
    {
        image: "/stakingpanelexample.png",
        text: <>
            <p>
                <span>From the perspective of User 2, the staking panel will look like this.</span>
            </p>
        </>,
    },
    {
        text: <>
            <p>
                <span>Now suppose that the match resulted in a Draw and hence both User 2 and User 3 were winners for this fixture. How much do they win?</span>
            </p>
            <p>
                <span>The answer is that they each receive a share of the total amount bet on this fixture for all outcomes (Home win, Draw, Away win). In this case, the total amount bet is 2 + 2 + 2 = 6 USDC.</span>
            </p>
            <p>
                <span>The share of the total amount bet a winner receives scales with the proportion of the total bet they made on the WINNING outcome. The total amount bet on the winning outcome in this case is 2 + 2 = 4 USDC, i.e. each of User 2 and User 3's bets.</span>
            </p>
            <p>
                <span>Using User 2 as an example, this user staked 2 USDC, which is half of the total amount staked on the winning outcome (4 USDC). Therefore, User 2 is eligible for half of the total amount bet on this fixture (6 USDC). So User 2 is eligible to claim 3 USDC from the contract</span>
            </p>
            <p>
                <span>Note that the same calculation is in effect for User 3, as this user also bet 2 USDC on the winning outcome. Therefore both users are eligible for a payout of 3 USDC.</span>
            </p>
            <p>
                <span>The last point to mention is commission, which is locked by the contract and can only be claimed by the contract owner. This is equal to 1% of the profits made by all users on a bet. Commission is taken on profits rather than total payout to ensure winners always get back what they put in (minus gas fees).</span>
            </p>
            <p>
                <span>In this case, for each of User 2 and User 3, their profit is 1 USDC, hence 0.01 USDC (1%) is kept for commission.</span>
            </p>
            <p>
                <span>Finally, for both User 2 and User 3, their eligible payout is 3 USDC - 0.01 USDC = 2.99 USDC.</span>
            </p>
        </>
    }
]

export const GuidePayoutCalculationComponent = () => (
    <GuideBodyStepsComponent steps={steps}/>
)