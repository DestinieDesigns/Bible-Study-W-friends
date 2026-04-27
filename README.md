# Scripture Path

Scripture Path is a mobile-first Bible learning prototype with a chalkboard cartoon UI. It includes:

- Home screen with a daily verse and progress overview
- Study Path with locked, unlocked, and completed chapters
- Bible Reading mode for free reading by book and chapter
- Practice Mode with mini review activities
- `localStorage` progress saving

## Project Structure

```text
Bible Study With Friends/
├── index.html
├── styles.css
├── js/
│   ├── app.js
│   ├── data.js
│   └── storage.js
└── README.md
```

## Run

This prototype has no build step and no backend.

1. Open [index.html](C:\Users\Living Room Desktop\Downloads\Bible Study With Friends\index.html) directly in a browser.
2. Or serve the folder with any simple static server if you prefer.

## Notes

- Progress is stored in the browser using `localStorage`.
- Study Path currently includes sample content for `Genesis` and `John`, three chapters each.
- The code is split so you can expand the data model and screens later without rewriting the whole app.
