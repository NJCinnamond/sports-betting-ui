import { BetType } from "../$types/betType";
import { FixtureResult } from "../$types/fixtureResult";

export const fixtureResultToBetType = (fixtureResult: FixtureResult) => {
    switch (fixtureResult) {
        case FixtureResult.CANCELLED:
            return BetType.HOME;
    }
}