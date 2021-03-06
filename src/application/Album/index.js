import React, {useState, useRef} from "react";
import { Container, TopDesc, Menu, SongItem, SongList } from "./style";
import { CSSTransition } from 'react-transition-group'
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import { getCount, getName, isEmptyObject } from '../../api/utils'
import { connect } from 'react-redux'
import { changeEnterLoading, getAlbumDetail } from './store/actionCreators'
import { useEffect } from "react";
import Loading from '../../baseUI/loading/index'
import { useCallback } from "react";
import SongsList from "../SongList/index";
import MusicNote from '../../baseUI/music-note/index'


function Album(props) {

    const [showStatus, setShowStatus] = useState(true)

    const id = props.match.params.id

    const { getAlbumDataDispatch } = props
    const { currentAlbum: currentAlbumImmutable, enterLoading } = props

    const musicNoteRef = useRef()

    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({ x, y })
    }

    useEffect(() => {
        getAlbumDataDispatch(id)
    }, [getAlbumDataDispatch, id])
    // mock数据
    const currentAlbum = currentAlbumImmutable ? currentAlbumImmutable.toJS() : {}

    const handleBack = useCallback(() => {
        setShowStatus(false)
    }, []) // 空数组依赖，意味着只有第一次进入组件才会渲染，后续不在重复渲染

    const renderTopDesc = () => (
        <TopDesc background={currentAlbum.coverImgUrl}>
            <div className="background">
                <div className="filter">

                </div>
            </div>
            <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">
                        {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
                    </span>
                </div>
            </div>
            <div className="desc_wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                    <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} alt="" />
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                </div>
            </div>
        </TopDesc>
    )

    const renderMenu = () => (
        <Menu>
            <div>
                <i className="iconfont">&#xe6ad;</i>
                评论
            </div>
            <div>
                <i className="iconfont">&#xe86f;</i>
                点赞
            </div>
            <div>
                <i className="iconfont">&#xe62d;</i>
                收藏
            </div>
            <div>
                <i className="iconfont">&#xe606;</i>
                更多
            </div>
        </Menu>
    )
    // 已经复用提取为公共组件SongList
    // const renderSongList = () => (
    //     <SongList>
    //         <div className="first_line">
    //             <div className="play_all">
    //             <i className="iconfont">&#xe6e3;</i>
    //             <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
    //             </div>
    //             <div className="add_list">
    //             <i className="iconfont">&#xe62d;</i>
    //             <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
    //             </div>
    //         </div>
    //         <SongItem>
    //             {
    //                 currentAlbum.tracks.map ((item, index) => {
    //                     return (
    //                     <li key={index}>
    //                         <span className="index">{index + 1}</span>
    //                         <div className="info">
    //                         <span>{item.name}</span>
    //                         <span>
    //                             { getName(item.ar) } - { item.al.name }
    //                         </span>
    //                         </div>
    //                     </li>
    //                     )
    //                 })
    //             }
    //         </SongItem>
    //     </SongList>
    // )

    return (
       <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={props.history.goBack} // 退出的时候进行路由跳转，实现动画的效果
        >
            <Container>
               <Header title={'返回'} handleClick={handleBack}></Header>
               {
                   !isEmptyObject(currentAlbum) ? (
                        <Scroll bounceTop={false}>
                                <div>
                                    { renderTopDesc() }
                                    { renderMenu() }
                                    <SongsList
                                        songs={currentAlbum.tracks}
                                        collectCount={currentAlbum.subscribedCount}
                                        showCollect={false}
                                        showBackground={false}
                                        musicAnimation={musicAnimation}
                                    >
                                    </SongsList>
                                </div>
                        </Scroll>
                   ) : null
               }
               <Loading show={enterLoading}></Loading>
               <MusicNote ref={musicNoteRef}></MusicNote>
            </Container>
        </CSSTransition>
    );
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(changeEnterLoading(true))
            dispatch(getAlbumDetail(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));