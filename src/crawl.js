import { getURLsFromHTML } from "./getURL.js";
import { normalizeURL } from "./normalizeURL.js";

// Crawl pages from the website recursively
async function crawlPage(baseURL, currentURL, visitedURLs) {
    try {
        console.log(`Crawling ${currentURL}...`);

        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);

        const normalizedCurrentURL = normalizeURL(currentURL);

        // Check if the URL is external domain, if yes just store it as "external"
        const getBaseHostname = (urlObj) =>
            urlObj.hostname.replace(/^www\./i, "");
        if (getBaseHostname(baseURLObj) !== getBaseHostname(currentURLObj)) {
            visitedURLs[normalizedCurrentURL] = "external";
            return visitedURLs;
        }

        if (!normalizedCurrentURL) {
            return visitedURLs;
        } else if (visitedURLs[normalizedCurrentURL]) {
            visitedURLs[normalizedCurrentURL]++;
            return visitedURLs;
        }

        // First time url visiting
        visitedURLs[normalizedCurrentURL] = 1;

        const response = await fetch(currentURL);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            console.log(
                `Error in fetching data from the ${currentURL} with status :${response.status}`,
            );
            return visitedURLs;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(
                `Non html response, content type: ${contentType} on ${baseURL}`,
            );
            return visitedURLs;
        }

        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            visitedURLs = await crawlPage(baseURL, nextURL, visitedURLs);
        }

        return visitedURLs;
    } catch (error) {
        console.error(`Error fetching ${currentURL}: ${error.message}`);
        return visitedURLs;
    }
}

export { crawlPage };
