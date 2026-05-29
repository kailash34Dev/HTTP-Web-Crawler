import { crawlPage } from "../src/crawl.js";

// Testing crawling and report generation
test("crawlPage, extract URLs", async () => {
    const baseURL = "https://www.aei.ac.in";
    const visitedURLs = {};

    // Mock global fetch
    const originalFetch = global.fetch;
    global.fetch = (url) => {
        return Promise.resolve({
            ok: true,
            headers: {
                get: () => "text/html",
            },
            text: () =>
                Promise.resolve(`
                <html>
                    <body>
                        <a href="https://aei.ac.in/chemistry-2">chemistry</a>
                        <a href="https://external.com/path">external</a>
                        <a href="javascript:void(0);">js link</a>
                    </body>
                </html>
            `),
        });
    };

    const result = await crawlPage(baseURL, baseURL, visitedURLs);
    global.fetch = originalFetch;

    expect(result["aei.ac.in/chemistry-2"]).toBeGreaterThanOrEqual(1);
    expect(result["external.com/path"]).toBe("external");
    expect(result["void(0);"]).toBeUndefined();
});
