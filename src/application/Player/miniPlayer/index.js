import React, { useRef } from "react";
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import { CSSTransition } from 'react-transition-group'
import ProgressCircle from '../../../baseUI/progress-circle/index'

function MiniPlayer(props) {
    const { song, fullScreen } = props
    const { toggleFullScreen } = props
    const miniPlyer = useRef()
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
                        <img src={song.al.picUrl} width="40" height="40" alt="img" className="play" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent="0.2">
                        <i className="icon-mini iconfont icon-pause">&#xe650;</i>
                    </ProgressCircle>
                </div>
                <div className="control">
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(MiniPlayer)