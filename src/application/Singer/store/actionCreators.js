import * as actionTypes from './constants'
import { getSingerInfoRequest } from '../../../api/request'
import { fromJS } from 'immutable'

const changeArtist = (data) => ({
    type: actionTypes.CHANGE_ARTIST,
    data: fromJS(data)
})

const changeSongsOfArtist = (data) => ({
    type: actionTypes.CHANGE_SONGS_OF_ARTIST,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})


export const getSingerInfo = id => {
    return dispatch => {
        getSingerInfoRequest(id).then(res => {
            let artist = res.artist
            let hotSongs = res.hotSongs
            dispatch(changeArtist(artist))
            dispatch(changeSongsOfArtist(hotSongs))
            dispatch(changeEnterLoading(false))
        })
    }
}
