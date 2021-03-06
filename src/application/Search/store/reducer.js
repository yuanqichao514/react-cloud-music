import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    hotList: [], // 热门关键词列表
    suggestList: [], // 歌单歌手列表
    songsList: [], // 歌曲列表
    enterLoading: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOT_KEYWORDS:
            return state.set('hotList', action.data);
        case actionTypes.SET_SUGGEST_LIST:
            return state.set('suggestList', action.data);
        case actionTypes.SET_RESULT_SONGS_LIST:
            return state.set('songsList', action.data);
        case actionTypes.SET_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        default:
            return state;
    }
}