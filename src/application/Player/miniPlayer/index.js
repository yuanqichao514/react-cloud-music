import React, { useRef } from "react";
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import { CSSTransition } from 'react-transition-group'
import ProgressCircle from '../../../baseUI/progress-circle/index'

function MiniPlayer(props) {
    const { song, fullScreen, playing, percent } = props
    const { toggleFullScreen, clickPlaying, togglePlayList } = props
    const miniPlyer = useRef()

    const handleTogglePlayList = (e) => {
        togglePlayList(true)
        e.stopPropagation()
    }
    return (
        <CSSTransition
        in={!fullScreen}
        classNames="mini"
        timeout={400}
        onEnter={() => {
            miniPlyer.current.style.display = 'flex'
        }}
        onExited={() => {
            miniPlyer.current.style.display = 'none'
        }}
        >
            <MiniPlayerContainer ref={miniPlyer} onClick={() => toggleFullScreen(true)}>
                <div className="icon">
                    <div className="imgWrapper">
                        {/* 暂停的时候唱片也要暂停 */}
                        <img className={`play${playing ? '' : 'pause'}`} src={song.al.picUrl} width="40" height="40" alt="img" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control" onClick={handleTogglePlayList}>
                    <ProgressCircle radius={32} percent={percent}>
                        {
                            playing ? 
                                <i className="icon-mini iconfont icon-pause" onClick={e => {clickPlaying(e, false)}}>&#xe650;</i>
                                :
                                <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe61e;</i> 
                        }
                    </ProgressCircle>
                </div>
                <div className="control" onClick={handleTogglePlayList}>
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(MiniPlayer)