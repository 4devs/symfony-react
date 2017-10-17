import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import queryString from 'query-string';
import mainReducer, { moduleName as mainModule } from '../ducks/main';

const router = (state = {}, action) => {
  const newState = routerReducer(state, action);

  if (action.type === LOCATION_CHANGE) {
    return {
      ...newState,
      location: {
        ...newState.location,
        query: queryString.parse(newState.location.search),
      },
    };
  }

  return newState;
};

export default combineReducers({
  router,
  form,
  formReducer,
  [mainModule]: mainReducer,
});
