const path = require('path')
module.exports = {
  title: 'Vue Graphics Grammar',
  description: "",
  themeConfig: {
    nav: [],
    sidebarDepth: 1,
    sidebar: [{
      title: 'Introduction',
      collapsable: false,
      children: [
        'introduction/intro',
        'introduction/installation',
      ]
    },
    {
      title: 'Tutorials',
      collapsable: true,
      children: [
        'tutorials/templates',
        'tutorials/custom2',
        'tutorials/customColor'
      ]
    },
    {
      title: 'Concepts',
      collapsable: true,
      children: [
        'concepts/data-loading.md',
        'concepts/transforming-data.md',
        'concepts/scaling.md',
        'concepts/interactivity.md'
      ]
    },
    {
      title: 'Core components',
      collapsable: true,
      children: [
        'core/graphic',
        'core/section',
        'core/data',
        'core/map',
        'core/scales',
        'core/grid',
        'core/repeat',
        'core/glyph',
        'core/plottitle'
      ]
    },
    {
      title: 'Marks',
      collapsable: true,
      children: [
        'marks/area',
        'marks/label',
        'marks/line',
        'marks/multi-line',
        'marks/path',
        'marks/point',
        'marks/multi-point',
        'marks/polygon',
        'marks/rectangle',
        'marks/symbol',
        'marks/trail'
      ]
    },
    {
      title: 'Guides',
      collapsable: true,
      children: [
        'guides/cartesian',
        'guides/gridlines',
        'guides/legends',
      ]
    },
    {
      title: 'Transformations',
      collapsable: true,
      children: [
        'transform/select',
        'transform/rename',
        'transform/filter',
        'transform/dropna',
        'transform/arrange',
        'transform/mutate',
        'transform/summarise',
        'transform/mutarise',
        'transform/groupby',
        'transform/binning',
      ]
    },
    {
      title: 'Scales',
      collapsable: true,
      children: [
        'scales/color',
        'scales/coords',
        'scales/opacity',
        'scales/radius',
        'scales/shape',
      ]
    },
    {
      title: 'Glyphs',
      collapsable: true,
      children: [
        'glyphs/piechart',
      ]
    },
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, '../../src'),
        "@public": path.resolve(__dirname, './public/')

      }
    }
  },
  markdown: {
    config: md => {
      md.use(require('markdown-it-multimd-table'), { enableMultilineRows: true })
    }
  }
}
