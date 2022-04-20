import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../api/config'

const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    }
];

const defaultState = fromJS({
    fullScreen: false, // 播放器是否全屏
    playing: false, // 当前歌曲是否播放
    sequencePlayList: playList, // 顺序播放列表(后续会有随机模式，列表乱序）
    playList: playList, // 播放列表
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
        default:
            return state
    }
}