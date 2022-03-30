import React from 'react'
function Rank(props) {
    return (
        <div>
            <div>Rank</div>
        </div>
    )
}

export default React.memo(Rank) // React.memo 为高阶组件，只渲染最近一次缓存结果，如果state或者context发生变化时，会重新渲染