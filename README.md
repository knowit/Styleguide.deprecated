#Deprecated
* New [Style Starter Kit](https://github.com/knowit/style-starterkit)
* New [Style Guide Starter Kit](https://github.com/knowit/style-guide-starterkit)
* New [Style Starter Kit assets](https://github.com/knowit/style-starterkit-assets)

# Living Style Guide Kickstarter

## Benefits

- Useful in both development and maintenance
- Prevent lack of consistency in design
- Timesaving
- Simplified testing
- Represents a UI component toolkit
- Checklist for necessary components
- Encourages the creation of independent building blocks for the interface
- Reuse
- More accurate estimates
- Easier to distribute work amongst the team
- Bridge between the designers and developers

## Conventions

* Single quotes only; ie. @import 'some_module'
* 1TBS (the one true brace style) ftw!
* Empty line after every declaration block
* Most Sass should be reusable, isolated components.
* Helpers should be mixins.
* Helpers don't output any CSS, modules and components do.
* Settings contain variables for colors, grid breakpoints, font sizes etc.
* Modules compose reusable UI elements.
* Components compose complex/larger reusable UI elements. Components is often composed by modules.
* Layouts outputs the different page layouts, with breakpoints and other specifications.
* You should be able to use a component across layouts.
* If you need to specify a component values (background, width etc.) in a layout you should do that inside the specific layout file **NOT** globally in the component file.

## Structure
This is an example structure. Take a closer look inside the style guide structure to get a deeper understanding.
```bash
sass
├── screen.scss
├── Helpers
│   ├── _buttons.scss
├── Settings
│   ├── _grid.scss
│   ├── _colors.scss
│   └── _typography.scss
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
└── _article.scss
```

## Naming Pattern
BEM (block, element, modifier)

#### The higher level of an module.
```css
.module {}
```
#### Descendent that helps form .module as a whole
```css
.module__element {}
```
#### Different state or version of .module
```css
.module--modifier {}
```

## Install
1. git clone git@github.com:knowit/Styleguide.git
5. [Install node](https://nodejs.org/en/)
6. npm install
7. gulp

### To BE(M) or not to BE(M)?
- [Getting your head round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- [Organizing CSS OOCSS SMACSS and BEM](https://mattstauffer.co/blog/organizing-css-oocss-smacss-and-bem)
- [SCSS styleguide with BEM OOCSS SMACSS](http://geek-rocket.de/frontend-development/scss-styleguide-with-bem-oocss-smacss/)
