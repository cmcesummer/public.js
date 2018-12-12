const space_fn = () => {};

export default {
    // 缓存天数
    day: 0,
    // 页面name  设置缓存天数时用
    name: "",
    // 是否使用默认html
    no_use_default_html: false,
    // loading 元素上用到的 loading 图
    loading_arr: [],
    // 首屏需要加载的图片数组
    page_arr: [],
    // 需要预加载的图片的包含元素  设置这个后就不需要设置 page_arr，
    // 而是会 读取 all_image_container 内的所有元素的背景图和image
    all_image_container: false,
    // 非首屏加载数组
    after_load_arr: [],
    // 在 所有 load 开始之前 可以拿到 dom
    before_load_callback: space_fn,
    // loading_arr 数组中的图片 load 完一张图片调用一次
    loading_single_callback: space_fn,
    // loading_arr load 完的回调
    loading_all_callback: space_fn,
    // page_arr 数组中的图片 load 完一张图片调用一次
    page_single_callback: space_fn,
    // page_arr load 完的回调  此时就可以展示业务页面了
    page_all_callback: space_fn,
    // 没有图片loading时的回调 设置缓存天数时用
    no_loading_callback: space_fn
};
