# Gulp Frontend

```bash
# install dependencies
npm install

# start browsersync and watch files
gulp serve

# build assests
gulp build
```
## Styles
This boilerplate comes with an set of css rules and some scss functions and mixins.  
All classes mixins and functions are opinionated and should be modified / or removed to match the projects requirements.

#### [`.o-container`](/assets/styles/5-objects/_container.scss)
Create a container.  
Limit the width, center the element and add some padding to the left and right.  

```html
<div class="o-container">
  <!-- content -->
</div>
```

#### [`.o-grid`](/assets/styles/5-objects/_grid.scss)
Create a flex grid.

```html
<div class="o-grid" data-base="col:1 gap:small" data-medium="col:2 gap:medium" data-large="col:3">
  <div>
    <!-- content -->
  </div>
  <div>
    <!-- content -->
  </div>
  <div>
    <!-- content -->
  </div>
</div>
```

#### [`.o-spacing`](/assets/styles/7-trumps/_spacing.scss)
Add paddings.

```html
<div data-base="s:small" data-medium="sb:none" data-large="st:medium">
  <!-- content -->
</div>
```

### Mixins
```scss
// use a defined breakpoint (e.g medium) or a length
// @include breakpoint('{breakpoint}' [, {media-type}])
@include breakpoint('{breakpoint}') {
  // rules
}

// @include breakpoint-until('{breakpoint}' [, {media-type}])
@include breakpoint-until('{breakpoint}') {
  // rules
}

// @include breakpoint-between('{breakpoint}', '{breakpoint}' [, {media-type}])
@include breakpoint-between(480px, 70em, 'print') {
  // rules
}

// add a font face
@include font-face('../path/to/font', otf eot woff) {
  font-family: Font;
  font-weight: 300;
  font-style: normal;
}

// set {key} to {value} in the registry
@include set('key', 'value');

// or set a map
@include set('spacing', (
  'small':  20px,
  'medium': 60px,
));
// 'spacing': (
//   'small':  20px,
//   'medium': 60px,
// );

// update / append
@include set('spacing', (
  'medium': 40px,
  'large':  80px,
));
// 'spacing': (
//   'small':  20px,
//   'medium': 40px,
//   'large':  80px,
// );

// add a color to the registry
@include set-color('primary', #1cf5b4);
// 'color': (
//   'primary': #1cf5b4,
// );

// automatically add gradients
@include set-color('primary', #1cf5b4, true);
// 'color': (
//   'primary': #1cf5b4,
//   'primary-light': #55f8c7,
//   'primary-lighter': #8efada,
//   'primary-lightest': #c6fdec,
//   'primary-dark': #15b887,
//   'primary-darker': #0e7b5a,
//   'primary-darkest': #073d2d,
// );

// change the way the gradients are created
// this is the default config for gradients
@include set-color('primary', #1cf5b4, true, (
  (
    'suffix': 'light' 'lighter' 'lightest',
    'color': #fff,
  ),
  (
    'suffix': 'dark' 'darker' 'darkest',
    'color': #000,
  )
));

// green gradients
// c('primary-green')
// c('primary-greener')
// c('primary-greenest')
@include set-color('primary', #1cf5b4, true, (
  (
    'suffix': 'green' 'greener' 'greenest',
    'color': green,
  )
));

@include data((
  'text:left':   left,
  'text:right':  right,
  'text:center': center,
), (
  'medium': 48em,
)) {
  text-align: value();
}
// [data-base~="text:left"] {
//   text-align: left;
// }
//
// [data-base~="text:right"] {
//   text-align: right;
// }
//
// [data-base~="text:center"] {
//   text-align: center;
// }
//
// @media (min-width: 48em) {
//   [data-medium~="text:left"] {
//     text-align: left;
//   }
//   
//   [data-medium~="text:right"] {
//     text-align: right;
//   }
//   
//   [data-medium~="text:center"] {
//     text-align: center;
//   }
// }

@include data('text', (
  'left',
  'right',
  'center',
), (
  'medium': 48em,
)) {
  text-align: value();
}
// [data-text~="left"] {
//   text-align: left;
// }
//
// [data-text~="right"] {
//   text-align: right;
// }
//
// [data-text~="center"] {
//   text-align: center;
// }
//
// @media (min-width: 48em) {
//   [data-text-medium~="left"] {
//     text-align: left;
//   }
//   
//   [data-text-medium~="right"] {
//     text-align: right;
//   }
//   
//   [data-text-medium~="center"] {
//     text-align: center;
//   }
// }
```

### Functions
Some options are stored inside a registry. This makes it possible to loop through specific options.  
By default `breakpoints`, `spacings` and `colors` are stored inside the the registry.
```scss
// get a value from the registry
// get('key' [, 'key']);
.example {
  padding: get('spacing', 'medium');
}

// loop through options
@each $key, $value in get('spacing') {
  .example--#{$key} {
    padding: $value;
  }
}

// get a color from the registry and apply several manipulations
// c('key' [, callback args...]);
.example {
  color: c('primary');
  color: c('primary', opacity 0.5);
  color: c('primary', mix deeppink 75%, shade 50%);
}
```
