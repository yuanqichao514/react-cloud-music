import React, {useEffect} from 'react'
import Horizon from '../../baseUI/horizon-item'
import { alphaTypes, categoryTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import { useState } from 'react'
import Scroll from '../../baseUI/scroll'
import { getHotSingerList, refreshMoreHotSingerList, getSingerList, refreshMoreSingerList, changeEnterLoading, changePageCount, changePullDownLoading, changePullUpLoading, changeSingerList } from './store/actionCreator'
import { connect } from 'react-redux'
import Loading from '../../baseUI/loading'


function Singers(props) {
    let [category, setCategory] = useState('')
    let [alpha, setAlpha] = useState('')

    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

    const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

    useEffect(() => {
        if(!singerList.size) {
            getHotSingerDispatch();
        }
        // eslint-disable-next-line
    }, []);

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
        updateDispatch(category, val) // 分类和列表联动
    }

    let handleUpdateCategory = (val) => {
        setCategory(val)
        updateDispatch(val, alpha)
    }

    let handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, !category, pageCount)
    }

    let handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha)
    }

      
    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        const singerResList = singerList ? singerList.toJS() : []
        return (
            <List>
            {
                singerResList.map((item, index) => {
                    return (
                        <ListItem key={item.accountId+""+index}>
                            <div className="img_wrapper">
                                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    )
                })
            }
            </List>
        )
    };


    return (
        <div>
            <NavContainer>
                <Horizon list={categoryTypes} title={"分类(默认热门):"} handleClick={handleUpdateCategory} oldVal={category}></Horizon>
                <Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
            </NavContainer>
            <ListContainer>
                <Scroll pullUp={handlePullUp} pullDown={handlePullDown} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading}>
                    { renderSingerList() }
                </Scroll>
                <Loading show={enterLoading}></Loading>
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList())
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0))
            dispatch(changeEnterLoading(true))
            dispatch(getSingerList(category, alpha))
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDispatch(category, alpha, hot, count) {
            console.log(category, alpha, hot, count);
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count+1));
            if(hot){
                dispatch(refreshMoreHotSingerList()); 
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//属于重新获取数据
            if(!category && !alpha){
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(React.memo(Singers)) // 优化性能