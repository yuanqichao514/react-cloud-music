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

function Player(props) {
    return (
        <div>player</div>
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