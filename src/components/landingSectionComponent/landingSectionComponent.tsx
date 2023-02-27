import { Box, styled } from '@mui/material';
import { FixtureNavigationButtonComponent } from '../fixtureNavigationButtonComponent/fixtureNavigationButtonComponent';
import "./landingSectionComponent.css";

const PREFIX = 'LandingSection';

const classes = {
    box: `${PREFIX}-box`,
    leftElem: `${PREFIX}-leftElem`,
    rightElem: `${PREFIX}-rightElem`,
    sectionHeader: `${PREFIX}-sectionHeader`,
};

export const LandingSectionComponent = () => {
    return (
        <div className="wrapper">
            <img className="left-elem" src="/salah.jpg"></img>
            <div className="text-area">
                <h2 className="section-header">Betting has never been simpler</h2>
                <span>
                    Sweeper is the easiest place to stake and win cryptocurrency on Premier League fixtures.
                </span>
            </div>
            <div className="text-area">
                <h2 className="section-header">Quick bets. Quick payouts.</h2>
                <span>
                    Stake on fixture results in seconds and your payout will be sent directly to your wallet immediately after the final whistle.
                </span>
                <div className="fixture-nav">
                    <FixtureNavigationButtonComponent/>
                </div>
            </div>
            <img className={classes.rightElem} src="/arteta.jpg"></img>
        </div>
        
    );
}