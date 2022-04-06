import * as actionTypes from './constants'
import { fromJS } from 'immutable'

export const defaultState = fromJS({
    currentAlbum: {},
    enterLoading: false
})

export default (state = defaultState, actions) => {
    switch(actions.type) {
        case actionTypes.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', actions.data)
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', actions.data)
        default:
            return state
    }
}