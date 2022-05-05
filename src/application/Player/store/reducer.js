import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../api/config'
import { findIndex } from '../../../api/utils'

const handleDeleteSong = (state, song) => {
    // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
    const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()));
    const sequenceList = JSON.parse(JSON.stringify(state.get('sequencePlayList').toJS()));
    let currentIndex = state.get('currentIndex');
    // 找对应歌曲在播放列表中的索引
    const fpIndex = findIndex(song, playList);
    // 在播放列表中将其删除
    playList.splice(fpIndex, 1);
    // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
    if (fpIndex < currentIndex) currentIndex--;
    
    // 在 sequenceList 中直接删除歌曲即可
    const fsIndex = findIndex(song, sequenceList);
    sequenceList.splice(fsIndex, 1);

    return state.merge({
        'playList': fromJS(playList),
        'sequencePlayList': fromJS(sequenceList),
        'currentIndex': fromJS(currentIndex),
    });
}

const defaultState = fromJS({
    fullScreen: false, // 播放器是否全屏
    playing: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序播放列表(后续会有随机模式，列表乱序）
    playList: [], // 播放列表
    mode: playMode.sequence, // 播放模式
    currentIndex: 0, // 当前播放歌曲索引
    showPlayList: false, // 是否显示播放列表
    currentSong: {}, // 当前播放歌曲
})

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
        case actionTypes.DELETE_SONG:
            return handleDeleteSong
        default:
            return state
    }
}