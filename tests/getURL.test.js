import { getURLsFromHTML } from "../src/getURL.js";

// Testing absolute URLs
test("getURLsFromHTML, extract URLs", () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.google.com">Google Blog</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.google.com";
    const expected = ["https://blog.google.com/"];
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    expect(actual).toEqual(expected);
});

// Testing relative URLs
test("getURLsFromHTML, extract URLs", () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path">Google Blog</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.google.com";
    const expected = ["https://blog.google.com/path"];
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    expect(actual).toEqual(expected);
});

// Testing invalid URLs
test("getURLsFromHTML, extract URLs", () => {
    const inputHTML = `
    <html>
        <body>
            <a href="http://blog.google.com">Google Blog</a>
            <a href="#">Google Blog</a>
            <a href="javascript:void(0);">Google Blog</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.google.com";
    const expected = ["http://blog.google.com/"];
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    expect(actual).toEqual(expected);
});