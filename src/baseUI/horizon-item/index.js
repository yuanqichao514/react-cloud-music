import React, { useState, useRef, useEffect, memo } from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types'

const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
        font-size: ${style["font-size-m"]};
        vertical-align: middle;
    }
`
const ListItem = styled.span`
    flex: 0 0 auto;
    font-size: ${style["font-size-m"]};
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
        color: ${style["theme-color"]};
        border: 1px solid ${style["theme-color"]};
        opacity: 0.8;
    }
`

function Horizon(props) {

    const { list, oldVal, title } = props

    const { handleClick } = props

    const Category = useRef(null)

    useEffect(() => {
        let categoryDom = Category.current
        let tagElems = categoryDom.querySelectorAll('span');
        let totalWidth = 0
        Array.from(tagElems).forEach( ele => {
            totalWidth += ele.offsetWidth
        })

        categoryDom.style.width = `${totalWidth}px`
    },[])

    return (
        <Scroll direction={"horizontal"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem key={item.key} className={`${oldVal === item.key ? 'selected' : ''}`} onClick={() => handleClick(item.key)}>
                                    { item.name }
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

// 首先考虑接受的参数
// list：接受的列表数据
// oldVal： 当前的item值
// title：列表左边的标题
// handleClick：点击item执行事件
Horizon.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
}

Horizon.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}

export default React.memo(Horizon)