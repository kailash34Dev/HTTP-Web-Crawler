# HTTP Web Crawler

A simple HTTP web crawler built with Node.js. It recursively crawls a given website, counts internal links, and identifies external links.

## Prerequisites

- Node.js installed

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies

## Usage

You can run the web crawler by providing a website URL:

```bash
npm start <website_url>
```

Example:
```bash
npm start www.gbtutorial.com
```

The crawler will output a formatted summary of internal links and external links found during the crawl.

## Testing

To run the test suite, use:
```bash
npm test
```
