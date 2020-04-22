import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // concat functions
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value() // To do the execution
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
    
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

/*
// One time memorization of the request using lodash Alternative 1
const _fetchUser =  _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
});
*/