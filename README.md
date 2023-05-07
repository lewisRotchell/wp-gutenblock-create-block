To use this package:

Add a script to your gutenberg themes package.json like this:

"scripts": {
"create-block": "create-block"
},

Then the command must take 3 arguments like this :

npm run create-block _name-of-prefix_ _name-of-block_ _php or js or both_

The last argument depends on how you want to render the block.
