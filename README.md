mathml-warning.js
=================

This repository contains some scripts to load
<a href="http://fred-wang.github.io/mathml.css/mathml.css">mathml.css</a> or
MathJax conditionally in order to
use it as a MathML polyfill. This is done by performing MathML feature
detections. You just need to insert one line in your document header:

    <html>
      <head>
        ...
        <script src="http://fred-wang.github.io/mathml-warning.js/mpadded.js"></script>
        ...
      </head>
      ...
    </html>

This will display a warning for browsers that do not implement the `<mpadded>`
element (at the moment all but Gecko browsers). The user may then ignore the
warning or choose a polyfill. The choice is saved during 30 days in the browser
cookie.
