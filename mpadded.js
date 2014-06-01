/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/*jslint browser: true*/

"use strict";

(function () {
    function handleChoice(aDiv, aChoice)
    {
      var el;
      switch (aChoice) {
        case "mathml.css":
          // Insert the mathml.css stylesheet.
          el = document.createElement("link");
          el.href = "http://fred-wang.github.io/mathml.css/mathml.css";
          el.rel = "stylesheet";
          document.head.appendChild(el);
        break;
        case "MathJax.js":
          // Insert the MathJax.js script.
          el = document.createElement("script");
          el.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=MML_HTMLorMML";
          document.head.appendChild(el);
        break;
        default:
          // Ignore the warning.
      }
      if (aDiv) {
        // Save the choice in the cookie and remove the warning.
        document.cookie = "MathMLFallback=" + aChoice +
                          ";path=/;max-age=" + 30 * 24 * 3600;
        document.body.removeChild(aDiv);
      }
    }

    window.addEventListener("load", function () {
        var box, div, namespaceURI, button;
        // First check whether the page contains any <math> element.
        namespaceURI = "http://www.w3.org/1998/Math/MathML";
        if (document.body.getElementsByTagNameNS(namespaceURI, "math")[0]) {
            // Create a div to test mpadded, using Kuma's "offscreen" CSS
            document.body.insertAdjacentHTML("afterbegin", "<div style='border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px;'><math xmlns='" + namespaceURI + "'><mpadded height='23px' width='77px'></mpadded></math></div>");
            div = document.body.firstChild;
            box = div.firstChild.firstChild.getBoundingClientRect();
            document.body.removeChild(div);
            if (Math.abs(box.height - 23) > 1  || Math.abs(box.width - 77) > 1) {
                // MathML does not seem to be supported...
                if (document.cookie) {
                  // If the cookie is set, apply the saved choice.
                  handleChoice(null,
                               document.cookie.replace(/^.*=(.*)$/, "$1"));
                } else {
                  // Otherwise, insert the warning.
                  document.body.insertAdjacentHTML("afterbegin", "<div style='border: 2px solid orange; box-shadow: 0 0 1em gold; padding: 10px; margin: 0; top: 0; left: 0; width: 95%; background: #fcf6d4; position: fixed;'><style scoped='scoped'>div { font-family: sans; } button { background: #ffd; }</style>Your browser does not seem to support MathML! You might want to download a <a href='https://www.mozilla.org/firefox/'>standard-compliant browser</a> or enable a fallback: <button>Ignore</button> <button>mathml.css</button> <button>MathJax.js</button></div>");
                  div = document.body.firstChild;
                  for (button = div.getElementsByTagName("button")[0]; button;
                       button = button.nextElementSibling) {
                    button.addEventListener("click", function (aEvent) {
                      handleChoice(div, aEvent.target.textContent);
                    });
                  }
                }
            }
        }
    });
}());
