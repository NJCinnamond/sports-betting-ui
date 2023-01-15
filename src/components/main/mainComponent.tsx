import { Page } from '../../redux/reducers/view';
import { useTypedSelector } from '../../redux/store';
import { FixtureBodyComponent } from '../fixtureBodyComponent/fixtureBodyComponent';
import { HomeBodyComponent } from '../homeBodyComponent/homeBodyComponent';
import { LinkFundBodyComponent } from '../linkFundBodyComponent/linkFundBodyComponent';


export const Main = () => {

    const selectedPage = useTypedSelector((state) => state.view.page);

    return (
        <div>
            {selectedPage == Page.HOME && (
                <HomeBodyComponent/>
            )}
            {selectedPage == Page.FIXTURES && (
                <FixtureBodyComponent />
            )}
            {selectedPage == Page.HOW_IT_WORKS && (
                <></>
            )}
            {selectedPage == Page.LINK_FUND && (
                <LinkFundBodyComponent/>
            )}
        </div>
    );
}