import React, {} from "react";
import { connect } from "react-redux";
import { changeShowPlayList } from "../Player/store/actionCreators";
import { PlayListWrapper, ScrollWrapper } from './style'


function PlayList(props) {
    return (
        <PlayListWrapper>
            <div className="list_wrapper">
                <ScrollWrapper></ScrollWrapper>
            </div>
        </PlayListWrapper>
    )
}

const mapStateToProps = (state) => ({
    showPlayList : state.getIn(['player', 'showPlayList'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));