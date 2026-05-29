// Normalize URL's
function normalizeURL(url) {
    try {
        const urlObj = new URL(url);
        let cleanedUrl = `${urlObj.hostname}${urlObj.pathname}`;

        if (cleanedUrl.endsWith("/")) {
            cleanedUrl = cleanedUrl.slice(0, -1);
        }

        return cleanedUrl;
    } catch (error) {
        console.error(error.message);
        return;
    }
}

export { normalizeURL };
