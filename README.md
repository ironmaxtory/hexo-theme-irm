## Introduction
A clean theme made for hexo blog.

## Install the theme
Clone the repo into the themes folder of your local hexo blog project folder.

```bash
# For example
$ git clone git@github.com:ironmaxtory/hexo-theme-irm.git my-hexo-blog/themes/
```

## Apply the theme
Open the `_config.yml` which configs you site instead of the theme, and modify the value of `theme` into `irm`.

Like this:
```YAML
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
# theme: landscape
theme: irm
```

Install the plugin `hexo-render-pug` in the root path of you hexo blog project:
```bash
$ npm install -S hexo-render-pug
```

## Debug the theme
If you wanna customize the theme according to your style, act like this:
```bash
$ cd my-hexo-blog/themes/irm
$ npm install
$ gulp
```

For sure, you can also customize the gulpfile.js to make your debug more efficient.
