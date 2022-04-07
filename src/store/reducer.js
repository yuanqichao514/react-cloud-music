import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer } from '../application/Rank/store/index'
import { reducer as albumReducer } from '../application/Album/store/index'
import { reducer as singerInfoReducer } from '../application/Singer/store/index'
import { reducer as playerReducer } from '../application/Player/store/index'

export default combineReducers({
    recommend: recommendReducer, // 将推荐列表的局部store注册到全局的store
    singers: singerReducer, // 将歌手列表的局部store注册到全局的store
    rank: rankReducer, // 将排行榜的局部store注册到全局的store
    album: albumReducer, // 将专辑列表的局部store注册到全局的store
    singerInfo: singerInfoReducer, // 将歌手详情的局部store注册到全局的store
    player: playerReducer, // 将播放器的局部store注册到全局的store
})