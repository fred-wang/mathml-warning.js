mathml-warning.js
=================

This repository contains scripts to display a warning for browsers that do not
have good MathML support. This is done by performing MathML feature detection
for the `<mpadded>` element (at the moment only implemented in Gecko browsers).
The user may then ignore the warning or choose a polyfill. The choice will
be saved during 30 days in the browser cookie.

You just need to insert one line in your document header:

    <html>
      <head>
        ...
        <script src="http://fred-wang.github.io/mathml-warning.js/mpadded-min.js"></script>
        ...
      </head>
      ...
    </html>

The english strings are specified in the `mpadded.js` file. Edit the
`locales.json` file if you wish to add more languages.
