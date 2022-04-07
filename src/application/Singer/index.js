import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style'
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import SongsList from "../SongsList";
import { HEADER_HEIGHT} from "../../api/config";
import { connect } from "react-redux";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import Loading from "../../baseUI/loading";

function Singer(props) {

    const [showStatus, setShowStatus] = useState(true)

    const { artist: immutableArtist, songs: immutableSongs, loading } = props
    const { getSingerDataDispatch } = props

    const artist = immutableArtist.toJS()
    const songs = immutableSongs.toJS()

    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();
    // 图片初始高度
    const initialHeight = useRef(0);

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;

    useEffect(() => {
        const id = props.match.params.id
        getSingerDataDispatch(id)
        let h = imageWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - OFFSET}px`
        initialHeight.current = h
        // 把遮罩层放下面，用来裹住歌曲列表
        layer.current.style.top = `${h - OFFSET}px`
        songScroll.current.refresh()
    }, [])

    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false)
    }, [])

    // 滚动交互
    const handleScroll = useCallback((pos) => {
        let height = initialHeight.current;
        const newY = pos.y;
        const imageDOM = imageWrapper.current;
        const buttonDOM = collectButton.current;
        const headerDOM = header.current;
        const layerDOM = layer.current;
        const minScrollY = -height + OFFSET + HEADER_HEIGHT;

        // 滑动距离占图片高度的百分比
        const percent = Math.abs(newY / height);
        // 处理下拉的情况，图片放大，按钮跟着偏移
        if (newY > 0) {
            imageDOM.style["transform"] = `scale(${1 + percent})`;
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`;
        } else if (newY >= minScrollY) {
            // 网上滑动，但是这招还没超过Header的高度
            layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
            //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
            layerDOM.style.zIndex = 1;
            imageDOM.style.paddingTop = "75%";
            imageDOM.style.height = 0;
            imageDOM.style.zIndex = -1;
            //按钮跟着移动且渐渐变透明
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            buttonDOM.style["opacity"] = `${1 - percent * 2}`;
        } else if (newY < minScrollY) {
            //往上滑动，但是超过Header部分
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
            layerDOM.style.zIndex = 1;
            //防止溢出的歌单内容遮住Header
            headerDOM.style.zIndex = 100;
            //此时图片高度与Header一致
            imageDOM.style.height = `${HEADER_HEIGHT}px`;
            imageDOM.style.paddingTop = 0;
            imageDOM.style.zIndex = 99;
        }


    }, [])


    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header ref={header} title={artist.name} handleClick={setShowStatusFalse}></Header>
                <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text">收藏</span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <SongsList
                        songs={songs}
                        showCollect={false}
                        >
                        </SongsList>
                    </Scroll>
                </SongListWrapper>
                <Loading show={loading}></Loading>
            </Container>
        </CSSTransition>
    );
}

const mapStateProps = (state) => ({
  artist: state.getIn(['singerInfo', 'artist']),
  songs: state.getIn(['singerInfo', 'songsOfArtist']),
  loading: state.getIn(['singerInfo', 'loading'])
})

const mapDispatchProps = (dispatch) => ({
  getSingerDataDispatch(id) {
    dispatch(changeEnterLoading(true))
    dispatch(getSingerInfo(id))
  }
})

export default connect(mapStateProps, mapDispatchProps)(React.memo(Singer));