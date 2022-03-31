import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'

export default combineReducers({
    recommend: recommendReducer // 将推荐列表的局部store注册到全局的store
})