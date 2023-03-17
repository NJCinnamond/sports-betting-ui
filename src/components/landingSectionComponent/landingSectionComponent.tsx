import { Page } from '../../redux/reducers/view';
import { NavigationButtonComponent } from '../navigationButtonComponent/navigationButtonComponent';
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
                    FanRise is the easiest place to stake and win cryptocurrency on Premier League fixtures.
                </span>
            </div>
            <div className="text-area">
                <h2 className="section-header">Quick bets. Quick payouts.</h2>
                <span>
                    Stake on fixture results in seconds and your winnings will be available to claim almost instantly after the final whistle
                </span>
                <div className="fixture-nav">
                    <NavigationButtonComponent
                        page={Page.FIXTURES}
                        label="VIEW FIXTURES"
                        size="medium"
                    />
                </div>
            </div>
            <img className={classes.rightElem} src="/arteta.jpg"></img>
        </div>
        
    );
}