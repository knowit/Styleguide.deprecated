# Style guide

 * Single quotes only; ie. @import 'some_module'
 * 1TBS (the one true brace style) ftw!
 * Empty line after every declaration block
 * Most Sass should be reusable, isolated components.
 * Components must either be variables, mixins or placeholder selectors not relying on any IDs.
 * Components don't output any CSS, modules do.
 * Modules compose reusable UI modules from different components
 * Layouts outputs the different page layouts, with breakpoints in layout etc.
 * Templates define the rest of a page type's design; backgrounds and other presentational tweaks
 

## Sass directory and file structure

This is an example structure with some example file names in them

```bash
sass
├── screen.scss - Actual output file that only imports from layouts and templates
├── components
│   ├── _grid.scss - Susy grid settings + media-layouts + basic placeholder selectors for grid layouts
│   ├── _colors.scss - Variables for site colors
│   ├── _buttons.scss - Mixins or placeholder selectors for generic amazebuttons
│   └── _typography.scss - Variables for font sizes, families, etc.
├── modules
│   ├── _buttons.scss - Composes components and variables(colors, icons, etc) into specific selectors targeting HTML
│   └── _typography.scss - Actual styling of typographic elements
├── layouts
│   ├── _article.scss - Composes the layout for an article page using _grid. Might also define custom, special grids
│   └── _images.scss - Defines how images should behave etc.
└── templates
    ├── _article.scss - Defines a specific page-style, based on a layout
    └── _frontpage.scss - Defines the frontpage layout
```
