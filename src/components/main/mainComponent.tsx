import { Page } from '../../redux/reducers/view';
import { useTypedSelector } from '../../redux/store';
import { FixtureBodyComponent } from '../fixtureBodyComponent/fixtureBodyComponent';
import { FixtureNotificationsComponent } from '../fixtureNotificationsComponent/fixtureNotificationsComponent';
import { GuideBodyComponent } from '../guideBodyComponent/guideBodyComponent';
import { HomeBodyComponent } from '../homeBodyComponent/homeBodyComponent';
import { LinkFundBodyComponent } from '../linkFundBodyComponent/linkFundBodyComponent';

export const Main = () => {

    const selectedPage = useTypedSelector((state) => state.view.page);

    // Get fixtures and render FixtureNotificationsComponents here to prevent rerender
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixtureNotifications: any[] = [];
    Object.keys(fixtures).forEach(fixtureID => {
        fixtureNotifications.push(
            <FixtureNotificationsComponent key={fixtureID} fixtureID={fixtureID}/>
        );
    });

    return (
        <div>
            {selectedPage == Page.HOME && (
                <HomeBodyComponent/>
            )}
            {selectedPage == Page.FIXTURES && (
                <FixtureBodyComponent />
            )}
            {selectedPage == Page.GETTING_STARTED && (
                <GuideBodyComponent/>
            )}
            {selectedPage == Page.LINK_FUND && (
                <LinkFundBodyComponent/>
            )}
            {fixtureNotifications}
        </div>
    );
}