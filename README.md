# Style guide

* Single quotes only; ie. @import 'some_module'
* 1TBS (the one true brace style) ftw!
* Empty line after every declaration block
* Most Sass should be reusable, isolated components.
* Helpers must either be mixins or placeholder selectors.
* Helpers don't output any CSS, modules do.
* Settings contain variables for colors, grid breakpoints, font sizes etc.
* Modules compose reusable UI modules.
* Components compose complex reusable UI components.
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
│   ├── _buttons.scss
│   ├── _lists.scss
│   ├── _tables.scss
│   ├── _hamburger.scss
│   └── _typography.scss
├── Components
│   ├── _social-icons.scss
│   ├── _office-card.scss
│   └── _navigation.scss
├── Layouts
└── _article.scss     - Composes the layout for an article page
```

##BEM – meaning block, element, modifier

The naming convention follows this pattern:

.module {}              // represents the higher level of an abstraction or component.

.module_element {}      // represents a descendent of .module that helps form .module as a whole.

.module--modifier {}    // represents a different state or version of .module.


###To BEM or not to BEM?

[Getting your head round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[Organizing CSS OOCSS SMACSS and BEM](https://mattstauffer.co/blog/organizing-css-oocss-smacss-and-bem)

[SCSS styleguide with BEM OOCSS SMACSS](http://geek-rocket.de/frontend-development/scss-styleguide-with-bem-oocss-smacss/)