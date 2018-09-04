console.group("程序猿何大叔的博客~");
console.log("我的微信：HeavenI");　
console.log("我的公众号：hadestory");　
console.log("我的掘金：程序猿何大叔");　
console.log("我的github：https://github.com/ironmaxtory");
console.log("我的工程模板github：https://github.com/irm-github");
console.groupEnd();

var version = '0.0.3';
var LC_KEY = 'blog.ironmaxi.com/sw_version';

// 注册 service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function (registration) {
    // 注册成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // 手动更新
    // if (window.localStorage.getItem(LC_KEY) !== version) {
    //   registration.update().then(()=>{
    //     window.localStorage.setItem(LC_KEY, version);
    //     console.log('ServiceWorker has been updated successful.');
    //   });
    // }
  }).catch(function (err) {
    // 注册失败 :(
    console.log('ServiceWorker registration failed: ', err);
  });
} else {
}