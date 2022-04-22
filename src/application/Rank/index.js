import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import * as actionTypes from './store/index'
import { filterIndex, filterIdx } from '../../api/utils'
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { Container, List, ListItem, SongList } from './style'
import { EnterLoading } from '../Singers/style'
import {renderRoutes} from 'react-router-config'

function Rank(props) {

    const { rankList: list, loading, songsCount } = props
    const { getRankListDataDispatch } = props
    
    let rankList = list ? list.toJS() : [];

    useEffect(() => {
        if(!list.size) {
            getRankListDataDispatch();
        }
    }, [])

    let globalStartIndex = filterIndex(rankList)
    let officialList = rankList.slice(0, globalStartIndex) // 官方榜
    let globalList = rankList.slice(globalStartIndex)   // 全球榜

    const enterDetail = (detail) => {
        props.history.push(`/rank/${detail.id}`)
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item, index) => {
                    return (
                        <ListItem key={item.coverImgId + index} tracks={item.tracks} onClick={() => enterDetail(item)}>
                            <div className="img_wrapper">
                                <img src={item.coverImgUrl} alt=""/>
                                <div className="decorate"></div>
                                <span className="update_frequecy">{item.updateFrequency}</span>
                            </div>
                            {
                                renderSongList(item.tracks)
                            }
                        </ListItem> 
                        )
                    })
                }
            </List>
        )
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={item.first + index}>{index+1}.{item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null
    }


    // 榜单数据未加载出来之前都给隐藏   
    let displayStyle = loading ? {display: 'none'} : {display: ''}

    return (
        <Container play={songsCount}>
            <Scroll>
                <div>
                    <h1 className='official' style={displayStyle}>官方榜</h1>
                    { renderRankList(officialList) }
                    <h1 className='global' style={displayStyle}>全球榜</h1>
                    { renderRankList(globalList, true) }
                    <EnterLoading><Loading show={loading}></Loading></EnterLoading>
                </div>
            </Scroll>
            {
                renderRoutes(props.route.routes)
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        rankList: state.getIn(['rank', 'rankList']),
        loading: state.getIn(['rank', 'loading']),
        songsCount: state.getIn(['player', 'playList']).size
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(actionTypes.getRankList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank)) // React.memo 为高阶组件，只渲染最近一次缓存结果，如果state或者context发生变化时，会重新渲染