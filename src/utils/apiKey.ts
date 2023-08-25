class ApiKey {
    private static _apiKey: string | null = localStorage.getItem('apiKey');

    public static get(): string | null {
        return this._apiKey;
    }

    public static set(apiKey: string) {
        this._apiKey = apiKey;
        localStorage.setItem('apiKey', apiKey);
    }

    public static clear() {
        this._apiKey = null;
        localStorage.removeItem('apiKey');
    }
}

export default ApiKey;
