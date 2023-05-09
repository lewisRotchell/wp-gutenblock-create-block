# Gutenberg Create Block

Gutenberg Create Block is a command line tool that allows you to quickly create new blocks for your Gutenberg WordPress themes.
With this tool, you can easily create new blocks in either PHP or JavaScript, or both.

## Installation

To install Gutenberg Create Block, run the following command:
`npm install -D gutenberg-create-block`

## Usage

To use Gutenberg Create Block, you need to add a script to your Gutenberg theme's package.json file.
Here's an example:

```js
"scripts": {
  "create-block": "gutenberg-create-block"
},
```

You must also have a theme set up where the blocks are stored in a folder structure like this:
`/src/blocks`

A great starting theme to use with this tool is [Gutentheme Blocks Plugin](https://github.com/lewisRotchell/Gutentheme-Blocks-Plugin).

Once you have everything set up, you can run the following command to create a new block:
`npm run create-block {name-of-prefix} {name_of_block} {php or js or both}`

name-of-prefix: The prefix you want to use for your block.
name_of_block: The name of your block. This will be used as the name of the block's directory and as the base name for the block's files.
php or js or both: How you want to render the block. You can choose php, js, or both.

For name of prefix, use "-" to seperate words.
For name of block, use "\_" to seperate words.

This command will create a new block with the specified prefix, name, and rendering method.
The block will be saved in your theme's /src/blocks directory.

## Contributing

If you find a bug or have a feature request, please open an issue on the [GitHub repository](https://github.com/lewisRotchell/wp-gutenblock-create-block).

Pull requests are also welcome!
