class UseCookieService {
    // Save a cookie
    static saveCookie(name: string, value: string, days?: number): void {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration time
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
    }

    // Load a cookie by its name
    static loadCookie(name: string): string | null {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null; // Return null if cookie not found
    }

    // Delete a cookie by its name
    static deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}

export default UseCookieService;
