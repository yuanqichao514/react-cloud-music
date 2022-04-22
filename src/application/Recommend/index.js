import React from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/scroll/index'
import Loading from '../../baseUI/loading/index'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import { useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'

function Recommend(props) {

    // mock数据
    // const bannerList = [1,2,3,4].map(item => {
    //     return {
    //         imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'
    //     }
    // })

    // const recommendList = [1,2,3,4,5,6,7,8,9,10].map(item => {
    //     return {
    //         id: 1,
    //         picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
    //         playCount: 17171122,
    //         name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    //     }
    // })

    // 实际请求
    const { bannerList, recommendList, enterLoading, songsCount } = props

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props

    useEffect(() => {
        // 如果页面有数据，则不发送请求
        // immutable数据结构长度属性为size
        if(!bannerList.size) {
            getBannerDataDispatch()
        }
    }, [bannerList.size])
    useEffect(() => {
        if(!recommendList.size) {
            getRecommendListDataDispatch()
        }
    }, [recommendList.size])

    const bannerListJS = bannerList ? bannerList.toJS() : []
    const recommendListJS = recommendList ? recommendList.toJS() : []

    return (
        // 这里Content是为了让better-scroll能够再固定高度的外部容器内实现滚动效果，这是基于bs的实现原理
        <Content play={songsCount}>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            <Loading show={enterLoading}></Loading>
            { renderRoutes(props.route.routes) }
        </Content>
    )
}

// 映射Redux全局的state到组件props上
const mapStateToProps = (state) => ({
    // 不要在这里将数据toJS
    // 不然每次diff比对props的时候都是不一样的引用，还是导致不必要的渲染，属于滥用immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
    songsCount: state.getIn(['player', 'playList']).size
})

// 映射dispatch到props上
const mapDispatchProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList())
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(React.memo(Recommend))