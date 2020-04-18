# Chrome Session Quicksave

A Chrome extension for quickly saving all open tabs inside a window into the browser bookmarks (with some configurability)

## How to deploy new version to chrome webstore

see https://developer.chrome.com/webstore/publish

## Rollup Setup

This extension will be packaged with rollup.  
The following plugin is used: <https://www.npmjs.com/package/rollup-plugin-chrome-extension>

Rollup will generate the following fields in manifest.json:

-   manifest_version
-   version (will be copied from package.json)
-   name
-   description

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

-   add an options page for extension configuration, allow config of
    -   'Sessions folder' - the default location where to save new sessions
    -   Default Behavior when session folder does already exist (overwrite, create new, ask)
-   switch to typescript: https://www.npmjs.com/package/@rollup/plugin-typescript
-   contribute to / fork https://github.com/mentaljam/rollup-plugin-copy2
    to remove deprecated rollup functionality from it

## Ideas after 1.0.0

-   add a notification which allows jumping to the new session in the bookmark manager
-   allow configuration of the pattern for default 'New Session' names.
-   add more languages (default language is english)

---

## Changelog

### 0.2.0 (Beta) - 2020-04-18

-   initial release
-   can save the urls from all tabs in the current window to a new folder under a folder called 'Sessions' somewhere in chrome bookmarks
