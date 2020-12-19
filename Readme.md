# Chrome Session Quicksave

A Chrome extension for quickly saving all open tabs inside a window into the browser bookmarks (with some configurability)

## How to deploy new version to chrome webstore

see https://developer.chrome.com/webstore/publish

## Icon Attributions

This project uses Icons from this icon pack:  
<https://www.flaticon.com/de/packs/mobile-interface-3>

<div>Icons by <a href="https://www.flaticon.com/de/autoren/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>

### Error Icon

Icon Pack:  
<https://www.flaticon.com/de/kostenloses-icon/schliessen_1828665>

<div>Icons by <a href="https://www.flaticon.com/de/autoren/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>

---

## Next Steps / Improvements for 1.0.0

### General

- add an options page for extension configuration, allow config of
  - Default Behavior when one specific session folder does already exist (overwrite, create new, ask)
- Add a component for visual selection of a parent bookmark folder for storing the session folders

### Migrating to Chrome Manifest V3

- [Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#action-api-unification)
- [Migration Checklist](https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/)

## Ideas after 1.0.0

- add a notification which allows jumping to the new session in the bookmark manager
- allow configuration of the pattern for default 'New Session' names.
- add more languages (default language is english)
- add notification when extension was updated, with link to changelog

## Unspecified Todos

- improve error html pages
- Add website for extension

---

## Changelog

### Next

Switch base plattform to snowpack, typescript and react & compile to esm.
Based on this [example repo](https://github.com/bjesuiter/react-snowpack-chrome-extension)

Benefits:

- no problems with unsafe eval caused by lazy loaded components (like with Stencil & Ionic)
- no big bloat like with Angular
- multi-entrypoint compiles (for background script & options page) by simple configs in snowpack

### 0.3.0 (Beta) - 2020-11-13 - added basic options page & Session Folder initialization after install

- use StencilJS as robust base for background script, toolbar icon click handler & options page
- compile extension from typescript (which improves stability a lot!)

### 0.2.0 (Beta) - 2020-04-18 - initial release improved

- added more icons
- improved readme and changelog
- improved code comment quality

### 0.1.0 (Beta) - 2020-04-18 - initial release

- can save the urls from all tabs in the current window to a new folder under a folder called 'Sessions' somewhere in chrome bookmarks
