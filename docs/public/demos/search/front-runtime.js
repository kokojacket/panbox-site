(function () {
    'use strict';

    var config = window.__PANBOX_DEMO_FRONT__ || {};
    var base = '/demos/search/';

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function notice(message) {
        var old = document.getElementById('panbox-demo-toast');
        if (old) old.remove();
        var node = document.createElement('div');
        node.id = 'panbox-demo-toast';
        node.textContent = message;
        node.style.cssText = 'position:fixed;left:50%;top:24px;z-index:10000;transform:translateX(-50%);padding:10px 16px;border-radius:6px;background:#303133;color:#fff;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.18);';
        document.body.appendChild(node);
        setTimeout(function () { node.remove(); }, 2200);
    }

    window.__panboxDemoNotice = notice;
    window.open = function () {
        notice('演示模式：未打开真实网盘或外部页面');
        return null;
    };

    if (window.axios) {
        axios.defaults.adapter = function (request) {
            var url = String(request.url || '');
            var data;
            if (url.indexOf('/api/tool/ranking') === 0) {
                var channel = request.params && request.params.channel;
                data = clone((config.ranking && config.ranking[channel]) || { code: 200, message: '获取成功', data: [] });
            } else if (url === '/api/tool/feedback') {
                data = { code: 200, message: '演示模式：需求仅保存在当前页面', data: null };
            } else if (url === '/api/search/save') {
                data = { code: 200, message: '演示模式：资源未真实转存', data: { url: location.origin + base + 'detail.html' } };
            } else if (url.indexOf('/api/wechat/') === 0) {
                data = { code: 200, message: '演示模式', data: { status: 'expired', message: '演示二维码不可用于真实绑定' } };
            } else {
                data = { code: 200, message: '演示模式：未发送真实请求', data: null };
            }
            return Promise.resolve({ data: data, status: 200, statusText: 'OK', headers: {}, config: request, request: null });
        };
    }

    function DemoEventSource() {
        var self = this;
        this.readyState = 0;
        this.closed = false;
        setTimeout(function () {
            if (self.closed) return;
            self.readyState = 1;
            if (self.onopen) self.onopen({ type: 'open' });
            var items = config.webResults || [];
            items.forEach(function (item, index) {
                setTimeout(function () {
                    if (!self.closed && self.onmessage) self.onmessage({ data: JSON.stringify(item) });
                }, 80 + index * 90);
            });
            setTimeout(function () {
                if (!self.closed && self.onmessage) self.onmessage({ data: '[DONE]' });
            }, 120 + items.length * 90);
        }, 30);
    }
    DemoEventSource.CONNECTING = 0;
    DemoEventSource.OPEN = 1;
    DemoEventSource.CLOSED = 2;
    DemoEventSource.prototype.close = function () {
        this.closed = true;
        this.readyState = 2;
    };
    window.EventSource = DemoEventSource;

    window.fetch = function () {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: function () { return Promise.resolve({ code: 200, message: '演示模式', data: null }); },
            text: function () { return Promise.resolve('{"code":200,"message":"演示模式","data":null}'); }
        });
    };

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        if (link.hasAttribute('download') || /^https?:\/\//i.test(href) && !href.startsWith(location.origin)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            notice('演示模式：未打开真实网盘或下载内容');
        }
    }, true);

    function applyQuery() {
        var keyword = new URLSearchParams(location.search).get('q');
        if (!keyword || !window.app) return;
        app.keyword = keyword;
        document.querySelectorAll('.Qbtn p span:first-child').forEach(function (node) {
            node.textContent = keyword;
        });
        document.title = keyword + ' - Panbox Search';
    }

    var attempts = 0;
    var timer = setInterval(function () {
        attempts += 1;
        if (window.__appReady && window.app) {
            clearInterval(timer);
            applyQuery();
        } else if (attempts > 80) {
            clearInterval(timer);
        }
    }, 50);
})();
