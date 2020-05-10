export function fetchData(input: RequestInfo, init?: RequestInit | undefined) {
    return fetch(input, init).then(reponse => {
        if (reponse.status >= 200 && reponse.status < 300) {
            return reponse.json();
        }
        throw reponse;
    });
}