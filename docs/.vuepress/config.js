const path = require('path')
module.exports = {
    title: 'Vue Graphics Grammar',
    description: "",
    themeConfig: {
        nav: [],
        sidebarDepth: 2,
        sidebar: [{
                title: 'Introduction',
                collapsable: false,
                children: [
                    'guide/intro',
                    'guide/installation',
                ]
            },
            {
                title: 'Tutorials',
                collapsable: true,
                children: [
                    'tutorials/basic',
                    'tutorials/custom2',
                    'tutorials/customColor'
                ]
            },
            {
                title: 'Template Graphs',
                collapsable: true,
                children: [
                    'graphs/plottitle',
                    'graphs/areaunder',
                    'graphs/boxplot',
                    'graphs/histogram',
                    'graphs/multiline',
                    'graphs/piechart',
                    'graphs/scatterplot',
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
                    'core/glyph'
                    ]
            },
            {
                title: 'Marks',
                collapsable: true,
                children: [
                    'marks/label',
                    'marks/line',
                    'marks/path',
                    'marks/polygon',
                    'marks/area',
                    'marks/rectangle',
                    'marks/symbol',
                    'marks/trail'
                    ]
            },
            {
                title: 'Axes',
                collapsable: true,
                children: [
                    'axes/cartesian',
                    'axes/gridlines'
                    ]
            },
            {
                title: 'Transformations',
                collapsable: true,
                children: [
                    'transform/arrange',
                    'transform/binning',
                    'transform/filter',
                    'transform/groupby',
                    'transform/indexTransform',
                    'transform/mutarize',
                    'transform/mutate',
                    'transform/rename',
                    'transform/select',
                    'transform/summarise',
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
                title: 'Positioners',
                collapsable: true,
                children: [
                    'positioners/wh',
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
            alias:{
            "@": path.resolve(__dirname, '../../src'),
            "@public": path.resolve(__dirname, './public/')

        }
    }
    },
    markdown: {
        config: md => {
            md.use(require('markdown-it-multimd-table'), {enableMultilineRows:true})
        }
    }
}
