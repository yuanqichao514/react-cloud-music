import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../api/config'

const defaultState = {
    fullScreen: false, // 播放器是否全屏
    playing: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序播放列表(后续会有随机模式，列表乱序）
    playList: [], // 播放列表
    mode: playMode.sequence, // 播放模式
    currentIndex: -1, // 当前播放歌曲索引
    showPlayList: false, // 是否显示播放列表
    currentSong: {}, // 当前播放歌曲
}

export default (state = defaultState, actions) => {
    switch (actions.type) {
        case actionTypes.SET_CURRENT_SONG:
            return state.set('currentSong', actions.data)
        case actionTypes.SET_FULL_SCREEN:
            return state.set('fullScreen', actions.data)
        case actionTypes.SET_PLAYING_STATE:
            return state.set('playing', actions.data)
        case actionTypes.SET_SEQUENCE_PLAYLIST:
            return state.set('sequencePlayList', actions.data)
        case actionTypes.SET_PLAYLIST:
            return state.set('playList', actions.data)
        case actionTypes.SET_PLAY_MODE:
            return state.set('mode', actions.data)
        case actionTypes.SET_CURRENT_INDEX:
            return state.set('currentIndex', actions.data)
        case actionTypes.SET_SHOW_PLAYLIST:
            return state.set('showPlayList', actions.data)
        default:
            return state
    }
}