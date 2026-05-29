import { crawlPage } from "./src/crawl.js";

async function main() {
    if (process.argv.length < 3) {
        console.error("No website provided. Please provide a website URL.");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.error("Too many arguments.");
        process.exit(1);
    }

    let currentURL = process.argv[2];

    if (
        !currentURL.startsWith("http://") &&
        !currentURL.startsWith("https://")
    ) {
        currentURL = "https://" + currentURL;
    }

    console.log(`Starting crawl of ${currentURL}...`);
    const pages = await crawlPage(currentURL, currentURL, {});
    console.log("\n=========================");
    console.log("      CRAWL SUMMARY      ");
    console.log("=========================");

    const sortedPages = Object.entries(pages).sort((a, b) => {
        const countA = a[1];
        const countB = b[1];
        if (countA === "external" && countB === "external") return 0;
        if (countA === "external") return 1;
        if (countB === "external") return -1;
        return countB - countA;
    });

    for (const [page, count] of sortedPages) {
        if (count === "external") {
            console.log(`[EXTERNAL] ${page}`);
        } else {
            console.log(
                `[INTERNAL] Found ${count} internal link(s) to ${page}`,
            );
        }
    }
}

main();
