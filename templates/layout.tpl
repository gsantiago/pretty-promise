<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/atom-one-dark.min.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"></script>
  <title>Pretty Promise - <%= page.metadata.title %></title>
</head>
<body>
  <script>hljs.initHighlightingOnLoad();</script>
  <header class="main-header">
    <div class="container">
      <a href="/pretty-promise" class="main-header-logo">
        Pretty Promise
      </a>
      <nav class="main-header-menu">
        <a href="/pretty-promise">Getting Started</a>
        <a href="constructor.html">API</a>
        <a href="http://github.com/gsantiago/pretty-promise" target="_blank">Github</a>
      </nav>
    </div>
  </header>
  <main class="main-content">
    <aside class="sidebar">
      <nav class="menu">
        <div class="block">
          <div>
            <strong>Introduction</strong>
          </div>
          <div>
            <a href="/pretty-promise">Getting Started</a>
          </div>
        </div>
        <div class="block">
          <div>
            <strong>API</strong>
          </div>
          <div>
            <a href="constructor.html">constructor</a>
          </div>
          <div>
            <a href="resolve.html">#resolve</a>
          </div>
          <div>
            <a href="reject.html">#reject</a>
          </div>
          <div>
            <a href="then.html">#then</a>
          </div>
          <div>
            <a href="catch.html">#catch</a>
          </div>
          <div>
            <a href="forEach.html">#forEach</a>
          </div>
          <div>
            <a href="map.html">#map</a>
          </div>
          <div>
            <a href="filter.html">#filter</a>
          </div>
          <div>
            <a href="reduce.html">#reduce</a>
          </div>
          <div>
            <a href="isPromise.html">.isPromise</a>
          </div>
          <div>
            <a href="when.html">.when</a>
          </div>
          <div>
            <a href="args.html">.args</a>
          </div>
        </div>
      </nav>
    </aside>
    <div class="content">
      <%- page.content %>
    </div>
  </main>
</body>
</html>