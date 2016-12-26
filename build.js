var glob = require('glob-contents')
var metadataParser = require('markdown-yaml-metadata-parser')
var marked = require('marked')
var fs = require('fs-promise')

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
      metadata: metadata.metadata
    })
  })

  return data
})
.then(function (data) {
  return fs.readFileAsync('./templates/layout.tpl', 'utf8').then(function () {
    return {
      data: data,
      template: template
    }
  })
})
.then(function (data) {

})
.catch(console.log)
