!function(g,I){"object"==typeof exports&&"object"==typeof module?module.exports=I():"function"==typeof define&&define.amd?define([],I):"object"==typeof exports?exports.FetchWorker=I():g.FetchWorker=I()}(this,function(){return function(g){function I(C){if(n[C])return n[C].exports;var e=n[C]={i:C,l:!1,exports:{}};return g[C].call(e.exports,e,e.exports,I),e.l=!0,e.exports}var n={};return I.m=g,I.c=n,I.i=function(g){return g},I.d=function(g,n,C){I.o(g,n)||Object.defineProperty(g,n,{configurable:!1,enumerable:!0,get:C})},I.n=function(g){var n=g&&g.__esModule?function(){return g.default}:function(){return g};return I.d(n,"a",n),n},I.o=function(g,I){return Object.prototype.hasOwnProperty.call(g,I)},I.p="",I(I.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\nvar worker = void 0;\n\nvar request = {\n    method: 'GET',\n    mode: 'cors',\n    cache: 'default',\n    redirect: 'follow',\n    headers: {\n        'Content-Type': 'application/json'\n    }\n};\n\nvar tasks = {};\n\nvar onmessage = function onmessage(event) {\n    var _event$data = event.data,\n        id = _event$data.id,\n        query = _event$data.query;\n\n    fetch(query.url, query.request).then(function (response) {\n        return response.json();\n    }).then(function (json) {\n        postMessage({ id: id, data: json });\n    }).catch(function (ex) {\n        postMessage({ id: id, error: ex });\n    });\n};\n\nvar blob = new Blob(['onmessage = ' + String(onmessage)], {\n    type: \"text\\/javascript\"\n});\n\nif (self.Worker) {\n    worker = new Worker(URL.createObjectURL(blob));\n} else {\n    worker = {\n        listener: null,\n        addEventListener: function addEventListener(eventType, callback) {\n            worker.listener = callback;\n        },\n        postMessage: function postMessage(input) {\n            var id = input.id,\n                query = input.query;\n\n            fetch(query.url, query.request).then(function (response) {\n                return response.json();\n            }).then(function (json) {\n                worker.listener({\n                    data: {\n                        id: id,\n                        data: json\n                    }\n                });\n            }).catch(function (ex) {\n                worker.listener({\n                    data: {\n                        id: id,\n                        error: ex\n                    }\n                });\n            });\n        }\n    };\n}\n\nworker.addEventListener('message', function (event) {\n    var _event$data2 = event.data,\n        id = _event$data2.id,\n        data = _event$data2.data;\n\n\n    tasks[id].promise.then(function () {\n        delete tasks[id];\n    });\n\n    tasks[id].res(data);\n}, false);\n\nvar API = {\n    fetch: function fetch(url) {\n        var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : request;\n\n        var id = Math.random() * 1000 + '_' + Date.now();\n        tasks[id] = function () {\n            var res = void 0,\n                rej = void 0;\n            var promise = new Promise(function (resolve, reject) {\n                res = resolve;\n                rej = reject;\n            });\n            return {\n                promise: promise,\n                res: res,\n                rej: rej\n            };\n        }();\n\n        var query = {\n            url: url || 'http://localhost:3000/api/List?' + Math.random(),\n            request: req\n        };\n\n        worker.postMessage({ id: id, query: query });\n\n        return tasks[id].promise;\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = API;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvcGx1Z2luL2luZGV4LmpzP2EzYjUiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHdvcmtlcjtcblxuY29uc3QgcmVxdWVzdCA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIG1vZGU6ICdjb3JzJyxcbiAgICBjYWNoZTogJ2RlZmF1bHQnLFxuICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9XG59O1xuXG5jb25zdCB0YXNrcyA9IHt9O1xuXG5jb25zdCBvbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHsgaWQsIHF1ZXJ5IH0gPSBldmVudC5kYXRhO1xuICAgIGZldGNoKHF1ZXJ5LnVybCwgcXVlcnkucmVxdWVzdClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZSh7IGlkLCBkYXRhOiBqc29uIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgaWQsIGVycm9yOiBleCB9KTtcbiAgICAgICAgfSk7XG59XG5cbmNvbnN0IGJsb2IgPSBuZXcgQmxvYihcbiAgICBbYG9ubWVzc2FnZSA9ICR7U3RyaW5nKG9ubWVzc2FnZSl9YF0sXG4gICAge1xuICAgICAgICB0eXBlOiBcInRleHRcXC9qYXZhc2NyaXB0XCJcbiAgICB9XG4pO1xuXG5pZiAoc2VsZi5Xb3JrZXIpIHtcbiAgICB3b3JrZXIgPSBuZXcgV29ya2VyKFxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgKTtcbn0gZWxzZSB7XG4gICAgd29ya2VyID0ge1xuICAgICAgICBsaXN0ZW5lcjogbnVsbCxcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogKGV2ZW50VHlwZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIHdvcmtlci5saXN0ZW5lciA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuICAgICAgICBwb3N0TWVzc2FnZTogKGlucHV0KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBpZCwgcXVlcnkgfSA9IGlucHV0O1xuICAgICAgICAgIGZldGNoKHF1ZXJ5LnVybCwgcXVlcnkucmVxdWVzdClcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICAgICAgICB3b3JrZXIubGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGpzb25cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGV4KSB7XG4gICAgICAgICAgICAgICAgICB3b3JrZXIubGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBleFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxud29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGlkLCBkYXRhIH0gPSBldmVudC5kYXRhO1xuXG4gICAgdGFza3NbaWRdLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc1tpZF07XG4gICAgfSk7XG5cbiAgICB0YXNrc1tpZF0ucmVzKGRhdGEpO1xufSwgZmFsc2UpO1xuXG5jb25zdCBBUEkgPSB7XG4gICAgZmV0Y2g6IGZ1bmN0aW9uICh1cmwsIHJlcSA9IHJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSBgJHsoTWF0aC5yYW5kb20oKSAqIDEwMDApfV8ke0RhdGUubm93KCl9YDtcbiAgICAgICAgdGFza3NbaWRdID0gKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXMsIHJlajtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVzID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICByZWogPSByZWplY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICByZXMsXG4gICAgICAgICAgICAgICAgcmVqXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgdXJsOiB1cmwgfHwgYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvTGlzdD8ke01hdGgucmFuZG9tKCl9YCxcbiAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICB9O1xuXG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkLCBxdWVyeSB9KTtcblxuICAgICAgICByZXR1cm4gdGFza3NbaWRdLnByb21pc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYi9wbHVnaW4vaW5kZXguanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBTEE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFJQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU1BO0FBQ0E7QUF6QkE7QUEyQkE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUF4QkE7QUFDQTtBQTBCQTsiLCJzb3VyY2VSb290IjoiIn0=")}])});