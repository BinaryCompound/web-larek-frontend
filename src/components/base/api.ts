export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get(uri: string): Promise<object>;
    post(uri: string, data: object, method?: ApiPostMethods): Promise<object>;
}

export class Api implements IApi {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            },
            ...options
        };
    }

    protected async handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) return response.json();

        return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    async get<T>(uri: string): Promise<T> {
        return await fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse<T>);
    }

    async post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse<T>);
    }

}