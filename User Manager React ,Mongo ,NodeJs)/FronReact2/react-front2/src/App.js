import AppRouting from "./appRouting"
import { Provider } from 'react-redux'
import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers';
import promiseMW from 'redux-promise';

const createStoreWithMW = applyMiddleware(promiseMW)(createStore)
const App = () => {
    return (
       <Provider store={createStoreWithMW(rootReducer)}>
            <div className="container-fluid">
                <div className="row">
                    <AppRouting />
                </div>
            </div>
       </Provider>
    )
}
export default App;