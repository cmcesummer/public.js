# loading page

## CHANGELOG

-   1.0.0:  
    第一版 `loadingPage`
-   1.1.0：  
    解决 `auto` 返回函数调用时机的问题
-   1.2.0:  
    添加支持 MP3 预加载的功能， 并 拓展接口： 用户可自己添加支持的 load 格式以及 load 函数。
    目前支持的格式有： `jpg png gif jpeg mp3`， 用户可通过 `change_load_fn` 重写 或者 添加新的支持格式。
