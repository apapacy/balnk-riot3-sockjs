'use strict';
import 'fetch';

export function assets(path) {
    return '/dependencies/' + path;
}

export function postJson(uri, data) {
    return fetch(
            uri, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            })
        .then(function(data) {
            if (!data.ok) {
                return data.json().then(function(data) {
                    throw data;
                });
            } else {
                return data.json();
            }
        })
};

export function getJson(uri, data) {
    const query = prepareQueryParameters(data);
    return fetch(
            uri + query, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            })
        .then(function(data) {
            if (!data.ok) {
                return data.json().then(function(data) {
                    throw data;
                });
            } else {
                return data.json();
            }
        })
};

/**
 * @param parameters GET параметры запроса в виде объекта
 * @returns String url-кодированная строка с лидирующим '?'
 */
function prepareQueryParameters(parameters) {
    if (!parameters) {
        return '';
    }
    let query = '';
    for (let name in parameters) {
        if (query === '') {
            query = '?' + encodeURIComponent(name) + '=' + encodeURIComponent(parameters[name]);
        } else {
            query = query + '&' + encodeURIComponent(name) + '=' + encodeURIComponent(parameters[name]);
        }
    }
    return query;
}

export function i18href(locale, href) {
    if (href.match(/:/)) {
        return href;
    }
    if (href === '/') {
        href = '';
    }
    return '/' + locale + (href.length === 0 || href.substring(0, 1) === '/' ? '' : '/') + href;
}


export function form2object(form, fields) {
    if (typeof form == "string") {
        var name = form;
        form = document.forms[name] || document.getElementByID(name);
    } else
        var name = form.name || form.id;
    var obj = {};

    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].tagName == "INPUT") {
            if (form.elements[i].type != "radio" && form.elements[i].type != "checkbox" || form.elements[i].checked) {
                if (form.elements[i].type === "checkbox") {
                    if (obj[(form.elements[i].name || form.elements[i].id || form.elements[i].type)] instanceof Array) {
                        obj[(form.elements[i].name || form.elements[i].id || form.elements[i].type)].push((form.elements[i].value || false));
                    } else {
                        obj[(form.elements[i].name || form.elements[i].id || form.elements[i].type)] = [];
                        obj[(form.elements[i].name || form.elements[i].id || form.elements[i].type)].push((form.elements[i].value || false));
                    }
                } else {
                    obj[(form.elements[i].name || form.elements[i].id || form.elements[i].type)] = (form.elements[i].value || null);
                }
            }
        } else if (form.elements[i].tagName == "SELECT") {
            for (var k = 0; k < form.elements[i].options.length; k++) {
                if (form.elements[i].options[k].selected) {
                    obj[(form.elements[i].name || form.elements[i].id || "select")] = form.elements[i].options[k].value
                }
            }
        }
    }
    if (fields) {
        var output = {};
        for (i = 0; i < fields.length; i++) {
            output[fields[i]] = obj[fields[i]];
        }
        return output;
    } else {
        return obj;
    }
}
