import React,  { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {  
    changeCurrentIndex, 
    changeCurrentSong, 
    changeFullScreen, 
    changePlayList, 
    changePlayMode, 
    changePlayingState, 
    changeShowPlayList  
} from './store/actionCreators'
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import Toast from '../../baseUI/toast/index'
import { getSongUrl, isEmptyObject, findIndex, shuffle } from "../../api/utils";
import { playMode } from "../../api/config";

function Player(props) {
    const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong, playList: immutablePlayList, mode, sequencePlayList: immutableSequencePlayList } = props
    const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch, changePlayListDispatch, changeModeDispatch, } = props

    // 目前的播放时间
    const [currentTime, setCurrentTime] = useState(0)
    // 歌曲总时长
    const [duration, setDuration] = useState(0)
    // 记录当前的歌曲，方便下次重渲染时对比是否时一首歌
    const [preSong, setPreSong] = useState({})
    // mode提示文字更改
    const [modeText, setModeText] = useState('')
    // 歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : (currentTime / duration)

    const playList = immutablePlayList.toJS()
    const sequencePlayList = immutableSequencePlayList.toJS()
    const currentSong = immutableCurrentSong.toJS()

    const audioRef = useRef()
    const toastRef = useRef()

    const clickPlaying = (e, state) => {
        e.stopPropagation()
        togglePlayingDispatch(state)
    }

    const updateTime = (e) => {
        setCurrentTime(e.target.currentTime)
    }

    const onProgressChange = curPercent => {
        const newTime = curPercent * duration
        setCurrentTime(newTime)
        audioRef.current.currentTime = newTime
        if(!playing) {
            togglePlayingDispatch(true)
        }
    }

    // 循环播放
    const handleLoop = () => {
        audioRef.current.currentTime = 0
        changePlayingState(true)
        audioRef.current.play()
    }
    // 上一首
    const handlePrev = () => {
        //  播放列表只有一首歌
        if(playList.length == 1) {
            handleLoop()
            return
        }
        let index = currentIndex - 1
        if(index < 0) index = playList.length - 1
        if(!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    // 下一首
    const handleNext = () => {
        //  播放列表只有一首歌
        if(playList.length == 1) {
            handleLoop()
            return
        }
        let index = currentIndex + 1
        if(index > (playList.length - 1)) index = 0
        if(!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    // 歌曲播放完成后的处理
    const handleEnd = () => {
        if(mode === playMode.loop) {
            handleLoop()
        }else {
            handleNext()
        }
    }
    // 更改模式
    const changeMode = () => {
        let newMode = (mode + 1) % 3
        if(newMode == 0) {
            // 顺序模式
            changePlayListDispatch(sequencePlayList)
            let index = findIndex(currentSong, sequencePlayList)
            changeCurrentIndexDispatch(index)
            setModeText('顺序循环')
        }else if(newMode == 1) {
            // 单曲循环
            changePlayListDispatch(sequencePlayList)
            setModeText('单曲循环')
        }else if(newMode == 2) {
            // 随机播放
            let newList = shuffle(sequencePlayList)
            let index = findIndex(currentSong, newList)
            changePlayListDispatch(newList)
            changeCurrentIndexDispatch(index)
            setModeText('随机播放')
        }
        changeModeDispatch(newMode)
        toastRef.current.show()
    }

    useEffect(() => {
        if(
            !playList.length || 
            currentIndex === -1 ||
            !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id
        ) {
            return
        }
        let current = playList[currentIndex]
        changeCurrentDispatch(current)
        setPreSong(current)
        audioRef.current.src = getSongUrl(current.id)
        setCurrentTime(0)
        setDuration((current.dt / 1000) | 0)
    },[ playList, currentIndex])

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])

    return (
        <div>
            {
                isEmptyObject(currentSong) ? null :
                <MiniPlayer 
                    song={currentSong} 
                    fullScreen={fullScreen}
                    playing={playing}
                    toggleFullScreen={toggleFullScreenDispatch}
                    clickPlaying={clickPlaying}
                    percent={percent}
                /> 
            }
           {
               isEmptyObject(currentSong) ? null :
               <NormalPlayer 
                    song={currentSong}
                    fullScreen={fullScreen}
                    playing={playing}
                    duration={duration}
                    currentTime={currentTime}
                    toggleFullScreen={toggleFullScreenDispatch}
                    clickPlaying={clickPlaying}
                    percent={percent}
                    onProgressChange={onProgressChange}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    mode={mode}
                    changeMode={changeMode}
               />
           }
            <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
            <Toast text={modeText} ref={toastRef}></Toast>  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fullScreen: state.getIn(["player", "fullScreen"]),
        playing: state.getIn(["player", "playing"]),
        currentSong: state.getIn(["player", "currentSong"]),
        showPlayList: state.getIn(["player", "showPlayList"]),
        mode: state.getIn(["player", "mode"]),
        currentIndex: state.getIn(["player", "currentIndex"]),
        playList: state.getIn(["player", "playList"]),
        sequencePlayList: state.getIn(["player", "sequencePlayList"])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayingDispatch(data) {
            dispatch(changePlayingState(data));
        },
        toggleFullScreenDispatch(data) {
            dispatch(changeFullScreen(data));
        },
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data));
        },
        changeCurrentIndexDispatch(index) {
            dispatch(changeCurrentIndex(index));
        },
        changeCurrentDispatch(data) {
            dispatch(changeCurrentSong(data));
        },
        changeModeDispatch(data) {
            dispatch(changePlayMode(data));
        },
        changePlayListDispatch(data) {
            dispatch(changePlayList(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));