import React, {useEffect, useImperativeHandle, useRef, forwardRef} from "react";
import styled from "styled-components";
import { prefixStyle } from "../../api/utils";
import style from '../../assets/global-style'

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
    transform: translate3d(0, 0, 0);
    >div {
      transition: transform 1s;
    }
  }
`

const MusicNote = forwardRef((props, ref) => {
    const iconsRef = useRef()
    // 容器中有3个音符，也就是同时只能有3个音符下落 
    const ICON_NUMBER = 3

    const transform = prefixStyle('transform')

    // 原声DOM操作，返回一个DOM节点对象
    const createNode = (txt) => {
        const template = `<div class="icon_wrapper">${txt}</div>`
        let tempNode = document.createElement('div')
        tempNode.innerHTML = template
        return tempNode.firstChild
    }

    const startAnimation = ({x, y}) => {
        for(let i = 0; i < ICON_NUMBER; i++) {
            let domArray = Array.from(iconsRef.current.children)
            let item = domArray[i]
            // 选择一个空闲元素开始动画
            if(item.running === false) {
                item.style.left = x+'px'
                item.style.top = y+'px'
                item.style.display = 'inline-block'

                setTimeout(() => {
                    item.running = true
                    item.style[transform] = 'translate3d(0, 750px, 0)'
                    let icon = item.querySelector('div')
                    icon.style[transform] = 'rotate3d(-40px, 0, 0)'
                }, 20)
                break;
            }
        }
    }

    useImperativeHandle(ref, () => ({
        startAnimation
    }))

    useEffect(() => {
        for(let i = 0; i < ICON_NUMBER; i++) {
            let node = createNode(`<div class="iconfont">&#xe642</div>`)
            iconsRef.current.appendChild(node)
        }
        // 类数组转换成数组
        let domArray = Array.from(iconsRef.current.children)
        domArray.forEach(item => {
            item.running = false
            item.addEventListener('transitonend', () => {
                this.style['display'] = 'none'
                this.style[transform] = 'translate3d(0, 0, 0)'
                this.running = false

                let icon = this.querySelector('div')
                icon.style[transform] = 'translate3d(0, 0, 0)'
            }, false)
        })
    }, [])

    return (
        <Container ref={iconsRef}>
        </Container>
    )
})

export default React.memo(MusicNote)