# VRI Lab website

Live site: https://vri-lab.github.io/VRI/

A static site (plain HTML, CSS and JavaScript, no build step) served by GitHub Pages from the `main` branch.

## Editing content

Nearly everything lives in **`assets/js/data.js`**:

| What | Where in `data.js` |
|---|---|
| Mission statement | `mission` |
| Philosophy principles (tiles with animations) | `principles` |
| Approach cards | `approach` |
| People, roles, links | `people` |
| Selected papers | `papers` |
| Target venues (scrolling strip) | `venues` |
| Community & resources | `activities` |
| Latest news | `news` |
| Roadmap | `roadmap` |

Commit to `main` and the site updates within a minute or two.

## Adding a photo

1. Save a square headshot (at least 400×400 px) as `assets/img/people/<id>.jpg`, where `<id>` matches the person's `id` in `data.js` (for example `lars-petersson.jpg`).
2. In `data.js`, set that person's `photo` to `"assets/img/people/<id>.jpg"`.

Until a photo is added, the site shows a gradient monogram.

## Adding a paper

Add an object to `papers` in `data.js`. Put a figure in `assets/img/work/` and set `img` to its path, or set `img: null` and give a `seed` number to get a generated cover.

## Structure

```
index.html            page structure and metadata
assets/css/style.css  styles
assets/js/data.js     content
assets/js/main.js     rendering, animations (hero point cloud, philosophy tile scenes)
assets/fonts/         self-hosted Inter and Space Grotesk (SIL OFL)
assets/img/           logo, icons, photos, paper figures
```
