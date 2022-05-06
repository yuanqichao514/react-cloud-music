import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Top, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'
import Player from '../Player/index'
import Search from '../Search'

function Home(props) {
    const {route} = props

    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">WebApp</span>
                <span className="iconfont search" onClick={() => props.history.push('/search')}>&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
                <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
                <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
            </Tab>
            {/* renderRoutes只能渲染一层路由，因此这里想要渲染二级路由还要再加一层 */}
            {renderRoutes(route.routes)}
            <Player></Player>
        </div>
    )
}

export default React.memo(Home)