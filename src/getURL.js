import { JSDOM } from "jsdom";

// Extract URLs from HTML pages
function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");

    const urls = [];
    for (const linkElement of linkElements) {
        const href = linkElement.getAttribute("href");

        if (href === null) {
            continue;
        }

        let fullUrl;
        if (href[0] === "/") {
            // Relative path
            try {
                fullUrl = new URL(baseURL + href);
                // Ignore non-http/https protocols (like javascript:, mailto:, tel:)
                if (
                    fullUrl.protocol !== "http:" &&
                    fullUrl.protocol !== "https:"
                ) {
                    continue;
                }
                urls.push(fullUrl.href);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Absolute path
            try {
                fullUrl = new URL(href);
                // Ignore non-http/https protocols (like javascript:, mailto:, tel:)
                if (
                    fullUrl.protocol !== "http:" &&
                    fullUrl.protocol !== "https:"
                ) {
                    continue;
                }
                urls.push(fullUrl.href);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return urls;
}

export { getURLsFromHTML };
