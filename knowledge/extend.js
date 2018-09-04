function _isObject(obj) {
    return {}.toString.call(obj) === '[object Object]';
}

function extend(deep, target = {}, source) {
    if(!deep) {
        for (let key in source) {
            targte[key] = source[key];
        }
        return
    }

    for ( let key in source ) { 
        // 这有两个 for in 是必须的，递归并不能遍历key
        let tar = target[key], sour = source[key];
        if(_isObject(source[key])) {
            target[key] = _isObject(tar) ? tar : {} ;
            extend(true, target[key], sour)
        } else {
            target[key] = source[key];
        }
    }
}


var a = {a:2,c:3,b:{c:1}}, b = {a:1, b:{c:2}}
extend(true, a, b);
console.log(a);
