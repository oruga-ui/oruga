export default class {
  API_ENDPOINT = "https://api.vuetelescope.com"
  getItems(slugs, sortField="rank", sortDirection="asc", limit=12, start=0) {
    const endpoint = new URL(`${this.API_ENDPOINT}/showcases/`)
    for (const property in slugs) {
      if (Array.isArray(slugs[property])) {
        for (const element of slugs[property]) {
          endpoint.searchParams.append(`${property}.slug`, element);
        }
      } else {
        endpoint.searchParams.append(`${property}.slug`, slugs[property]);
      }
    }
    endpoint.searchParams.append('_limit', limit)
    endpoint.searchParams.append('_start', start)
    endpoint.searchParams.append('_sort', `${sortField}:${sortDirection}`)
    return fetch(endpoint.href)
      .then(response => response.json())
  }
  getItemsCount(slugs, sortField="rank", sortDirection="asc") {
    const endpoint = new URL(`${this.API_ENDPOINT}/showcases/count/`)
    for (const property in slugs) {
      if (Array.isArray(slugs[property])) {
        for (const element of slugs[property]) {
          endpoint.searchParams.append(`${property}.slug`, element);
        }
      } else {
        endpoint.searchParams.append(`${property}.slug`, slugs[property]);
      }
    }
    endpoint.searchParams.append('_sort', `${sortField}:${sortDirection}`)
    return fetch(endpoint.href)
      .then(response => response.json())
  }
}
