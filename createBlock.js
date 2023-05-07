#!/usr/bin/env node

const fs = require("fs").promises;

const prefix = process.argv[2];
if (!prefix) {
  return console.error("Please specify a prefix");
}

const blockName = process.argv[3];
if (!blockName) {
  return console.error("Please specify a block name");
}

const blockNamePhp = blockName.replace(/-/g, "_");

//block.json title
const blockTitle = blockName
  .replace(/-/g, " ")
  .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

let renderType = process.argv[4];

if (renderType != "php" && renderType != "js" && renderType != "both") {
  console.error("Please specify a render type: php or js or both");
  return;
}

const directoryName = `./src/blocks/${blockName}`;

let saveJs = "";
let renderPhp = "";

const blockJson = {
  $schema:
    "https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/block.json",
  apiVersion: 2,
  version: "1.0.0",
  name: `${prefix}/${blockName}`,
  title: blockTitle,
  icon: "smiley",
  textdomain: prefix,
  attributes: {},
  supports: {
    html: false,
  },
  editorScript: "file:./index.js",
  editorStyle: "file:./index.css",
  style: [`${blockNamePhp}-style-frontend`],
};

const indexJs = `
import { registerBlockType } from '@wordpress/blocks';

import "./style.css";
import "./editor.css";

import edit from './edit';
import save from './save';

registerBlockType('${prefix}/${blockName}', {
  edit,
  save,
});`;

const editJs = `
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ({ attributes, setAttributes }) => {
  return (
    <div className={...useBlockProps}>
        <h1>${blockName}</h1>
    </div>
  );
};

export default Edit;`;

if (renderType === "js" || renderType === "both") {
  saveJs = `
    import { useBlockProps } from '@wordpress/block-editor';

    const Save = ({attributes}) => {
        return (
            <div className={...useBlockProps.save()}>
                <h1>${blockName}</h1>
            </div>
        );
    }

    export default Save;`;
}

if (renderType === "php") {
  saveJs = `
  export default function Save() {
    return null;
  }
  `;
}

if (renderType === "php" || renderType === "both") {
  renderPhp = `
    <?php
    function ${blockNamePhp}_render_cb( $attributes) {
        ob_start(); ?>
        <div class="${prefix}-${blockName}">
            <h1>${blockName}</h1>
        </div>
        <?php
        return ob_get_clean();
    }
    `;
}

const editorCss = ``;
const styleCss = ``;

async function createBlock() {
  try {
    await fs.mkdir(directoryName);
    console.log("Directory created successfully!");

    await fs.writeFile(
      `${directoryName}/block.json`,
      JSON.stringify(blockJson, null, 2)
    );
    console.log(`File "${directoryName}/block.json" created.`);

    await fs.writeFile(`${directoryName}/index.js`, indexJs);
    console.log(`File "${directoryName}/index.js" created.`);

    await fs.writeFile(`${directoryName}/edit.js`, editJs);
    console.log(`File "${directoryName}/edit.js" created.`);

    await fs.writeFile(`${directoryName}/save.js`, saveJs);
    console.log(`File "${directoryName}/save.js" created.`);

    if (renderPhp) {
      await fs.writeFile(`${directoryName}/render.php`, renderPhp);
      console.log(`File "${directoryName}/render.php" created.`);
    }

    await fs.writeFile(`${directoryName}/editor.css`, editorCss);
    console.log(`File "${directoryName}/editor.css" created.`);

    await fs.writeFile(`${directoryName}/style.css`, styleCss);
    console.log(`File "${directoryName}/style.css" created.`);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.error("Block already exists! Please choose another name");
      return;
    }
    console.error(err);
    return;
  }
}

createBlock();
