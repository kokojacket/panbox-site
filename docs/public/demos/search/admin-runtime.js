(function () {
    'use strict';

    var fixture = window.__PANBOX_DEMO_ADMIN__ || { state: {}, responses: [] };
    var responseMap = {};
    (fixture.responses || []).forEach(function (item) {
        responseMap[item.url] = item.data;
    });

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function parseData(value) {
        if (!value) return {};
        if (typeof value === 'object') return value;
        try { return JSON.parse(value); } catch (error) { return {}; }
    }

    function notice(message) {
        var old = document.getElementById('panbox-demo-toast');
        if (old) old.remove();
        var node = document.createElement('div');
        node.id = 'panbox-demo-toast';
        node.textContent = message;
        node.style.cssText = 'position:fixed;left:50%;top:22px;z-index:20000;transform:translateX(-50%);padding:10px 16px;border-radius:5px;background:#303133;color:#fff;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.18);';
        document.body.appendChild(node);
        setTimeout(function () { node.remove(); }, 2300);
    }

    window.__panboxDemoMessage = notice;
    window.open = function () {
        notice('演示模式：未执行真实下载或外部跳转');
        return null;
    };

    function listFromResponse(response) {
        if (!response || !response.data) return null;
        if (Array.isArray(response.data)) return response.data;
        if (Array.isArray(response.data.data)) return response.data.data;
        if (Array.isArray(response.data.list)) return response.data.list;
        return null;
    }

    function filterResponse(response, payload) {
        var keyword = String(payload.keyword || payload.title || '').trim().toLowerCase();
        if (!keyword) return response;
        var list = listFromResponse(response);
        if (!list) return response;
        var filtered = list.filter(function (item) {
            return JSON.stringify(item).toLowerCase().indexOf(keyword) !== -1;
        });
        if (Array.isArray(response.data)) response.data = filtered;
        else if (Array.isArray(response.data.data)) {
            response.data.data = filtered;
            response.data.total = filtered.length;
            response.data.last_page = filtered.length ? 1 : 0;
        } else if (Array.isArray(response.data.list)) response.data.list = filtered;
        return response;
    }

    function matchingList(url) {
        var controller = url.split('/').slice(0, 3).join('/');
        var key = Object.keys(responseMap).find(function (candidate) {
            return candidate.indexOf(controller + '/') === 0 && /\/(getList|list)$/i.test(candidate);
        });
        return key ? responseMap[key] : null;
    }

    function mutate(url, payload) {
        var response = matchingList(url);
        var list = listFromResponse(response);
        if (!list) return;
        var idKey = Object.keys(payload).find(function (key) { return /_id$/.test(key) || key === 'id'; }) || 'id';
        var id = payload[idKey];
        if (/\/delete$/i.test(url)) {
            var ids = String(id || '').split(',');
            for (var index = list.length - 1; index >= 0; index -= 1) {
                if (ids.indexOf(String(list[index][idKey] || list[index].id)) !== -1) list.splice(index, 1);
            }
        } else if (/\/(update|setStatus)$/i.test(url)) {
            var row = list.find(function (item) { return String(item[idKey] || item.id) === String(id); });
            if (row) Object.assign(row, payload);
        } else if (/\/add$/i.test(url)) {
            var next = Object.assign({}, payload);
            next[idKey] = next[idKey] || Date.now();
            list.unshift(next);
        }
        if (response && response.data && !Array.isArray(response.data) && typeof response.data.total === 'number') {
            response.data.total = list.length;
        }
    }

    function fallback(url, payload) {
        if (/getInviteInfo/i.test(url)) {
            return { code: 200, message: '获取成功', data: { invite_code: 'PANBOX-DEMO', invited_count: 3, invited_users: [{ username: '演示用户 A' }, { username: '演示用户 B' }] } };
        }
        if (/getFiles/i.test(url)) {
            return { code: 200, message: '演示目录已加载', data: [{ value: 'demo-library', label: '演示资源库', leaf: false }, { value: 'demo-archive', label: '归档目录', leaf: true }] };
        }
        if (/getKeywordReplyRules/i.test(url)) {
            return { code: 200, message: '获取成功', data: [{ id: 1, keyword: '帮助', reply: '请输入影视名称开始搜索', enabled: 1, weight: 100 }] };
        }
        if (/getSearchApiList/i.test(url)) {
            return { code: 200, message: '获取成功', data: [{ id: 1, name: '主搜索线路', status: 1 }] };
        }
        if (/getMessageLogList/i.test(url)) {
            return { code: 200, message: '获取成功', data: { current_page: 1, per_page: 20, total: 2, data: [{ id: 2, sender_id: 'demo-user-02', direction: 'in', content: '仙逆', create_time: '2026-07-20 20:18:00' }, { id: 1, sender_id: 'demo-user-01', direction: 'out', content: '已找到 5 条资源', create_time: '2026-07-20 20:16:00' }] } };
        }
        if (/getConversationMessages/i.test(url)) {
            return { code: 200, message: '获取成功', data: [{ direction: 'in', content: '凡人修仙传', create_time: '2026-07-20 20:10:00' }, { direction: 'out', content: '已找到相关资源', create_time: '2026-07-20 20:10:02' }] };
        }
        if (/getSuspiciousIpList/i.test(url)) {
            return { code: 200, message: '获取成功', data: { list: [{ ip: '198.51.100.24', search_count: 86, keyword_count: 41, first_time: '2026-07-20 18:00:00', last_time: '2026-07-20 19:06:00', sample_user_agent: 'Mozilla/5.0 Demo Browser' }] } };
        }
        if (/getSuspiciousUaList/i.test(url)) {
            return { code: 200, message: '获取成功', data: { list: [{ user_agent: 'DemoCrawler/1.0', search_count: 72, ip_count: 4, keyword_count: 38, matched_keyword: 'crawler', reason: '高频访问', last_time: '2026-07-20 19:08:00' }] } };
        }
        if (/\/detail$/i.test(url)) {
            var response = matchingList(url);
            var list = listFromResponse(response) || [];
            return { code: 200, message: '数据获取成功', data: clone(list[0] || payload) };
        }
        return { code: 200, message: '演示模式：操作仅在当前页面生效', data: payload || null };
    }

    if (window.axios) {
        axios.defaults.adapter = function (request) {
            var url = String(request.url || '');
            var payload = parseData(request.data);
            var response = responseMap[url] ? clone(responseMap[url]) : fallback(url, payload);
            if (/\/(add|update|delete|setStatus|sort|clear|save|send|regenerate|toggle|unbind)/i.test(url)) {
                mutate(url, payload);
                response = { code: 200, message: '演示模式：操作仅在当前页面生效', data: response && response.data || null };
            } else if (/\/(getList|list)$/i.test(url)) {
                response = filterResponse(response, payload);
            }
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve({ data: response, status: 200, statusText: 'OK', headers: {}, config: request, request: null });
                }, 80);
            });
        };
    }

    window.fetch = function () {
        return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve({ code: 200, message: '演示模式', data: null }); }, text: function () { return Promise.resolve(''); } });
    };
    window.EventSource = function () { this.close = function () {}; };

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        if (link.hasAttribute('download') || /^https?:\/\//i.test(href) && !href.startsWith(location.origin) || /^\/admin\//.test(href)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            notice('演示模式：未执行真实下载、上传或外部操作');
        }
    }, true);

    var attempts = 0;
    var timer = setInterval(function () {
        attempts += 1;
        if (window.app && app.$data) {
            clearInterval(timer);
            Object.keys(fixture.state || {}).forEach(function (key) {
                app.$set(app, key, clone(fixture.state[key]));
            });
            if (app.loading && typeof app.loading === 'object') {
                Object.keys(app.loading).forEach(function (key) { app.loading[key] = false; });
            }
        } else if (attempts > 120) {
            clearInterval(timer);
        }
    }, 50);
})();
