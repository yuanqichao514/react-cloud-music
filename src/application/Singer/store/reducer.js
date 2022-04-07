import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const  defaultState = fromJS({
    artist: {},
    songsOfArtist: [],
    loading: true
})

export default (state= defaultState, actions) => {
    switch(actions.type) {
        case actionTypes.CHANGE_ARTIST:
            return state.set('artist', actions.data)
        case actionTypes.CHANGE_SONGS_OF_ARTIST:
            return state.set('songsOfArtist', actions.data)
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('loading', actions.data)
        default:
            return state
    }
}