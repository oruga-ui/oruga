export default class {
    API_ENDPOINT = "https://api.vuetelescope.com";
    getItems(
        slugs: any,
        sortField = "rank",
        sortDirection = "asc",
        limit = 12,
        start = 0,
    ): Promise<any> {
        const endpoint = new URL(`${this.API_ENDPOINT}/showcases/`);
        for (const property in slugs) {
            if (Array.isArray(slugs[property])) {
                for (const element of slugs[property]) {
                    endpoint.searchParams.append(`${property}.slug`, element);
                }
            } else {
                endpoint.searchParams.append(
                    `${property}.slug`,
                    slugs[property],
                );
            }
        }
        endpoint.searchParams.append("_limit", String(limit));
        endpoint.searchParams.append("_start", String(start));
        endpoint.searchParams.append("_sort", `${sortField}:${sortDirection}`);
        return fetch(endpoint.href).then((response) => response.json());
    }
    getItemsCount(
        slugs: any,
        sortField = "rank",
        sortDirection = "asc",
    ): Promise<any> {
        const endpoint = new URL(`${this.API_ENDPOINT}/showcases/count/`);
        for (const property in slugs) {
            if (Array.isArray(slugs[property])) {
                for (const element of slugs[property]) {
                    endpoint.searchParams.append(`${property}.slug`, element);
                }
            } else {
                endpoint.searchParams.append(
                    `${property}.slug`,
                    slugs[property],
                );
            }
        }
        endpoint.searchParams.append("_sort", `${sortField}:${sortDirection}`);
        return fetch(endpoint.href).then((response) => response.json());
    }
}
