import React from "react";
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

function Player(props) {

    const { fullScreen } = props
    const { toggleFullScreenDispatch } = props

    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{name: "薛之谦"}]
    }

    return (
        <div>
            <MiniPlayer 
            song={currentSong} 
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreenDispatch}
            />
            <NormalPlayer 
            song={currentSong}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreenDispatch}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fullScreen: state.getIn(['player', 'fullScreen']),
        playing: state.getIn(['player', 'playing']),
        sequencePlayList: state.getIn(['player', 'sequencePlayList']),
        showPlayer: state.getIn(['player', 'showPlayer']),
        currentSong: state.getIn(['player', 'currentSong']),
        mode: state.getIn[('player', 'mode')],
        currentIndex: state.getIn(['player', 'currentIndex']),
        playList: state.getIn(['player', 'playList']),
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