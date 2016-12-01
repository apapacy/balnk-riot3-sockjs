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
