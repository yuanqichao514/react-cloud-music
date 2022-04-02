import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer } from '../application/Rank/store/index'

export default combineReducers({
    recommend: recommendReducer, // 将推荐列表的局部store注册到全局的store
    singers: singerReducer, // 将歌手列表的局部store注册到全局的store
    rank: rankReducer, // 将排行榜的局部store注册到全局的store
})