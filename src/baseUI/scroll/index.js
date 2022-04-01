import React, { useRef, useState, forwardRef, useEffect } from "react";
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import { useImperativeHandle } from "react"; 
import Loading from '../loading'
import LoadingV2 from '../loading-v2'

const ScrollContainer = styled.div`
    width: 100%;
    height:100%;
    overflow:hidden;
` 

const PullUpLoading = styled.div`
    position: absolute;
    left:0; right:0;
    bottom: 5px;
    width: 60px;
    height: 60px;
    margin: auto;
    z-index: 100;
`;

export const PullDownLoading = styled.div`
    position: absolute;
    left:0; right:0;
    top: 0px;
    height: 30px;
    margin: auto;
    z-index: 100;
`;

const Scroll = forwardRef((props, ref) => { // 这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
    // better-scroll实例对象
    const [bScroll, setBScroll] = useState()
    // current指向初始化bs实例需要的DOM元素
    const scrollContainerRef = useRef()  // 调用ref.current可以获取到指向的ref对象

    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;

    const PullUpDisplayStyle = pullUpLoading ? { display: ''}: {display: 'none'}
    const PullDownDisplayStyle = pullDownLoading ? { display: ''}: {display: 'none'}

    // 创建BS实例
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizontal",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            debounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })

        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])
    // 每次重新渲染刷新实例，防止无法滚动
    useEffect(() => {
        if(refresh && bScroll) {
            bScroll.refresh()
        }
    })
    // 绑定scroll事件
    useEffect(() => {
        if(!bScroll || !onScroll) return
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll)
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])

    // 上拉到底，上拉刷新
    useEffect(() => {
        if(!bScroll || !pullUp) return
        bScroll.on('scrollEnd', (scroll) => {
            // 判断是否滑动到了底部
            if(bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp()
            }
        })
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUp, bScroll])
    // 下拉到底，下拉刷新
    useEffect(() => {
        if(!bScroll || !pullDown) return
        bScroll.on('touchEnd', (pos) => {
            // 判断是否滑动到了底部
            if(pos.y > 50) {
                pullDown()
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, bScroll])

    useImperativeHandle(ref, () => ({ // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值, 这样就可以在父组件中调用scrollContainerRef.current.refresh
        refresh() {
            if(bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0,0)
            }
        },
        getBScroll() {
            if(bScroll) {
                return bScroll
            }
        }
    })
    )

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {props.children}
            <PullUpLoading style={PullUpDisplayStyle}><Loading></Loading></PullUpLoading>
            <PullDownLoading style={PullDownDisplayStyle}><LoadingV2></LoadingV2></PullDownLoading>
        </ScrollContainer>
    )

})

Scroll.defaultProps = {
    direction: "vertical", // 滚动的方向
    click: true, // 是否支持点击
    refresh: true,// 是否刷新
    onScroll:null,// 滑动触发的回调函数
    pullUpLoading: false,// 上拉加载逻辑
    pullDownLoading: false,// 下拉加载逻辑
    pullUp: null,// 是否显示上拉 loading 动画
    pullDown: null,// 是否显示下拉 loading 动画
    bounceTop: true,// 是否支持向上吸顶
    bounceBottom: true// 是否支持向下吸底
};

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizontal']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll