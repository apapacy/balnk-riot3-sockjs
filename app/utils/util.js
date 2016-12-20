/**
 * @param parameters GET параметры запроса в виде объекта
 * @returns String url-кодированная строка с лидирующим '?'
 */
export function prepareQueryParameters(parameters) {
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

export function promify(self, func, ...args) {
    return new Promise(function(resolve, reject) {
        // node.js object.method(...args, callback)
        // callback is last element of arguments list
        // callbcak signature callbcak(error, data)
        args.push(function(error, data) {
            if (error) {
                reject(error);
            } else {
                if (data) {
                  resolve(data);
                } else {
                  resolve(self);
                }
            }
        });
        func.apply(self, args);
    });
}
