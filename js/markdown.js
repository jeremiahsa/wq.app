/*
 * wq.app 0.4.2-dev - markdown.js
 * Adds markdown support to template.js
 * (c) 2013, S. Andrew Sheppard
 * http://wq.io/license
 */

define(["./lib/marked", "./lib/highlight", "./template"],
function(marked, highlight, tmpl) {

// Exported module object
var md = {};

// md.init registers a context function to process markdown within templates
// Should be called after tmpl.init()
md.init = function(tmplvar, contextvar) {

    // Default variable names
    if (!tmplvar) tmplvar = "html"; // Look for {{html}} in template
    if (!contextvar) contextvar = "markdown" // Replace w/ parse(this.markdown)

    tmpl.setDefault(tmplvar, function() {
        if (!this[contextvar])
            return "";
        return md.parse(this[contextvar]);
    });
}

// Parsing function (can be used directly)
md.parse = function(value) {
    return md.postProcess(marked.parse(value));
}

// Override with custom post-processing function
md.postProcess = function(html) {
    return html;
}

// Connect markdown processor to code highlighter
marked.setOptions({
    'highlight': function(code, lang) {
        return highlight.highlight(lang, code).value;
    }
});

return md;

});
