import { Fixture } from "../$types/fixture";
import { viewActions } from "../redux/reducers/view"
import { store } from "../redux/store"

const setSelected = (fixture: Fixture) => store.dispatch(viewActions.setSelected(fixture));

export { setSelected }