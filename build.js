var glob = require('glob-contents')
var metadataParser = require('markdown-yaml-metadata-parser')
var marked = require('marked')
var fs = require('fs-promise')
var path = require('path')
var ejs = require('ejs')
var _ = require('lodash')

Promise.resolve()
.then(function () {
  return glob('./pages/*.md')
})
.then(function (pages) {
  var data = []

  Object.keys(pages).forEach(function (filepath) {
    var page = pages[filepath]
    var metadata = metadataParser(page)
    data.push({
      content: marked(metadata.content),
      metadata: metadata.metadata,
      slug: path.basename(filepath, '.md')
    })
  })

  return data
})
.then(function (data) {
  return fs.readFile('./templates/layout.tpl', 'utf8').then(function (template) {
    return {
      pages: data,
      template: template
    }
  })
})
.then(function (data) {
  var promises = []
  var template = ejs.compile(data.template)

  data.pages.forEach(function (page) {
    var options = {
      pages: data.pages,
      _: _,
      page: page,
      getFromCategory: function (category) {
        return _.filter(data.pages, function (page) {
          return page.category === category
        })
      }
    }
    var promise = fs.writeFile(page.slug + '.html', template(options) ,'utf8')
    promises.push(promise)
  })

  return Promise.all(promises)
})
.then(function () {
  console.log('Docs generated!')
})
.catch(console.log)
