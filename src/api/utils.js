import {
    RankTypes
} from './config'

export const getCount = (count) => {
    if (count < 0) return
    if (count < 1000) {
        return count
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + '万'
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

// 防抖函数
export const debounce = (func, delay) => {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(...args)
        }, delay)
    }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
    for (let i = 0; i < rankList.length; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1
        }
    }
}

// 获得排行榜的索引
export const filterIdx = (name) => {
    for (let key in RankTypes) {
        if (RankTypes[key] === name) return key;
    }
    return null;
};

// 处理歌手列表拼接歌手名字
export const getName = (list) => {
    let str = ''
    list.map ((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
      });
    return str;
}

// 非空对象判断
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

// 给CSS3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;

let vendor = (() => {
    // 首先通过transition判断是什么浏览器
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return style;
    }
    if (vendor === 'standard') {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

//拼接出歌曲的url链接
export const getSongUrl = id => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

// 转换歌曲播放时间
export const formatPlayTime = interval => {
    interval = interval | 0 // | 0表示向下取整 ，位运算，或
    const minute = (interval / 60) | 0
    const second = (interval % 60).toString().padStart(2, "0")
    return  `${minute}:${second}`
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机算法
export function shuffle(arr) {
    let new_arr = []
    arr.forEach(item => {
        new_arr.push(item)
    })
    for (let i = 0; i < new_arr.length; i++) {
        let j = getRandomInt(0, i);
        let t = new_arr[i];
        new_arr[i] = new_arr[j];
        new_arr[j] = t;
    }

    return new_arr
}

// 找到当前歌曲索引
export const findIndex = (song, list) => {
    return list.findIndex(item => {
        return item.id === song.id
    })
}

