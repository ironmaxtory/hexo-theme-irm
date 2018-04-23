var cacheName = 'blog.ironmaxi.com';    

/**
 * install 事件
 */
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
  // event.waitUntil(
  //   caches.open(cacheName)
  //   .then(cache => cache.addAll([                            
  //     '/', '/index.html',
  //     '/offline/', '/offline/index.html',
  //     '/css/irm.css',
  //     'https://cdn.ironmaxi.com/images/wechat/qrcode_pure.png',
  //   ]))
  //   .then(function(){
  //     // 安装阶段跳过等待，直接进入 active 阶段
  //     return self.skipWaiting();
  //   })
  // );
});

/**
 * activate 事件
 */
self.addEventListener('activate', function(event){
  console.log('触发 activate 事件，清理缓存资源33');
  return event.waitUntil(
    Promise.all([
      // 更新客户端
      clients.claim(),
      // 清理缓存数据
      caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
          caches.delete(key);
        }))
      })
    ]).then(()=>{
      return caches.open(cacheName)
        .then(cache => cache.addAll([                            
          '/', '/index.html',
          '/css/irm.css',
          '/favicon.png',
          'https://cdn.ironmaxi.com/images/wechat/qrcode_pure.png',
          // 离线资源
          '/offline/', '/offline/index.html', '/css/offline.css', '/favicon-offline.png',
        ]));
    })
  );
});

function onlineRequest(request) {
  return fetch(request).then(                    
    function (response) {
      if (!response || response.status !== 200) {       
        return response;
      }
      var responseToCache = response.clone();
      caches.open(cacheName)                            
        .then(function (cache) {
          cache.put(request, responseToCache);   
        });          
      return response;
    }
  );
}

function offlineRequest(request) {
  if (!request.url.match(/\.(css|js|jpg|png|jpeg|gif)$/)) {
    return caches.match('/offline/index.html');
  }
}

self.addEventListener('fetch',  function (event) {  
  // console.log('触发 fetch 事件');         
  // console.log(event);         
  event.respondWith(
    caches.match(event.request)                             
    .then(function (response) {
      // 返回缓存命中的文件
      if (response) {                                       
        return response;
      }
      // 未命中，继续执行
      var requestToCache = event.request.clone();  
      if (navigator.onLine) {
        console.log('联网状态');
        // 联网状态
        return onlineRequest(requestToCache);
      } else {
        console.log('离线状态');
        // 离线状态
        return offlineRequest(requestToCache);
      }
      // return fetch(requestToCache).then(                    
      //   function (response) {
      //     if (!response || response.status !== 200) {       
      //       return response;
      //     }
      //     var responseToCache = response.clone();
      //     caches.open(cacheName)                            
      //       .then(function (cache) {
      //         cache.put(requestToCache, responseToCache);   
      //       });          
      //     return response;
      //   }
      // );
    })
  );
});

