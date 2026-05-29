import { normalizeURL } from "../src/normalizeURL.js";

// Remove protocol and use only the hostname
test("normalizeURL, strip protocol from the url", () => {
    const input = "https://blog.google.com";
    const expected = "blog.google.com";
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

// Remove trailing slashes
test("normalizeURL, strip trailing slash", () => {
    const input = "https://blog.google.com/";
    const expected = "blog.google.com";
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});

// Convert capitals to small
test("normalizeURL, convert capital letters to small letters", () => {
    const input = "https://BLOG.GOOGLE.com/";
    const expected = "blog.google.com";
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
});
