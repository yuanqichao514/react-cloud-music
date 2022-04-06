import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getAlbumDetailRequest } from '../../../api/request'

const changeCurrentAlbum = (data) => ({
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getAlbumDetail = (id) => {
    return (dispatch) => {
        getAlbumDetailRequest(id).then((res) => {
            let data = res.playlist
            dispatch(changeCurrentAlbum(data))
            dispatch(changeEnterLoading(false))
        }).catch((err) => {
            console.log(err)
        })
    }
}