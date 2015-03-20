# Style guide

 * Single quotes only; ie. @import 'some_module'
 * 1TBS (the one true brace style) ftw!
 * Empty line after every declaration block
 * Most Sass should be reusable, isolated components.
 * Helpers must either be mixins or placeholder selectors.
 * Helpers don't output any CSS, modules do.
 * Settings contain variables for colors, grid breakpoints, font sizes etc.
 * Modules compose reusable UI modules.
 * Layouts outputs the different page layouts, with breakpoints etc.

## Sass directory and file structure

This is an example structure with some example file names in them

```bash
sass
├── screen.scss - Actual output file that only imports from layouts and templates
├── Helpers
│   ├── _buttons.scss     - Mixins or placeholder selectors for generic amazebuttons
├── Settings
│   ├── _grid.scss        - Neat grid settings
│   ├── _colors.scss      - Variables for site colors
│   └── _typography.scss  - Variables for font sizes, families, etc.
├── Modules
│   ├── _buttons.scss     - Creating specific selectors targeting HTML
│   └── _typography.scss  - Actual styling of typographic elements
├── Layouts
    └── _article.scss     - Composes the layout for an article page
```
