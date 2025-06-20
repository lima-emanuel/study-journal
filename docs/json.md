# Notes on JSON

## Basics

A piece of JSON can be any of:

- A collection of name/value pairs `{ }`;
- An ordered list of values `[ ]`.

JSON in its purest form has no actual comments, but most parsers will accept C-style (`//`, `/**/`) comments.

Supported data types:

- Strings: "hello", "\"A quote.\"", "\u0abe", "Newline.\n"
- Numbers: 23, 0.11, 12e10, 3.141e-10, 1.23e+4
- Objects: { "key": "value" }
- Arrays: ["Values"]
- Miscellaneous: true, false, null

```json
{
  "key": "value",

  "keys": "must always be enclosed in double quotes",
  "numbers": 0,
  "strings": "Hellø, wørld. All unicode is allowed, along with \"escaping\".",
  "has bools?": true,
  "nothingness": null,

  "big number": 1.2e+100,

  "objects": {
    "comment": "Most of your structure will come from objects.",

    "array": [0, 1, 2, 3, "Arrays can have anything in them.", 5],

    "another object": {
      "comment": "These things can be nested, very useful."
    }
  },

  "silliness": [
    {
      "sources of potassium": ["bananas"]
    },
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, "neo"],
      [0, 0, 0, 1]
    ]
  ],

  "alternative style": {
    "comment": "check this out!"
  , "comma position": "doesn't matter, if it's before the next key, it's valid"
  , "another comment": "how nice"
  },



  "whitespace": "Does not matter.",



  "that was short": "And done. You now know everything JSON has to offer."
}
```
