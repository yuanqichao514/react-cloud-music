import React from 'react'
import Horizon from '../../baseUI/horizon-item'
import { alphaTypes, categoryTypes } from '../../api/config'
import { NavContainer } from './style'
import { useState } from 'react'



function Singers(props) {
    let [category, setCategory] = useState('')
    let [alpha, setAlpha] = useState('')

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
    }

    let handleUpdateCategory = (val) => {
        setCategory(val)
    }



    return (
       <NavContainer>
            <Horizon list={categoryTypes} title={"分类(默认热门):"} handleClick={handleUpdateCategory} oldVal={category}></Horizon>
            <Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
       </NavContainer>
    )
}

export default React.memo(Singers)  