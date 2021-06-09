export default class {
    API_ENDPOINT = "https://api.vuetelescope.com"
    loadItems(slugs, sortField="rank", sortDirection="desc", limit=24, start=0) {
        const endpoint = new URL(`${this.API_ENDPOINT}/showcases/`)
        for (const property in slugs) {
            endpoint.searchParams.append(`${property}.slug`, slugs[property]);
        }
        endpoint.searchParams.append('_limit', limit)
        endpoint.searchParams.append('_start', start)
        endpoint.searchParams.append('_sort', `${sortField}:${sortDirection}`)
        return fetch(endpoint.href)
            .then(response => response.json())
    }
    loadCount(slugs, sortField="rank", sortDirection="desc") {
        const endpoint = new URL(`${this.API_ENDPOINT}/showcases/count/`)
        for (const property in slugs) {
            endpoint.searchParams.append(`${property}.slug`, slugs[property]);
        }
        endpoint.searchParams.append('_sort', `${sortField}:${sortDirection}`)
        return fetch(endpoint.href)
            .then(response => response.json())
    }
}
