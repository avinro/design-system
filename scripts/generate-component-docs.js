const fs = require('fs');
const path = require('path');

function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .trim()
    .split(/[\s-_]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Skipped (already exists): ${filePath}`);
  }
}

function createEmptyFileIfMissing(filePath) {
  writeIfMissing(filePath, '');
}

function parseArgs(argv) {
  const args = { names: [], library: null, category: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--library' && argv[i + 1]) {
      args.library = argv[++i];
    } else if (argv[i] === '--category' && argv[i + 1]) {
      args.category = argv[++i];
    } else {
      args.names.push(argv[i]);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.names.length === 0 || !args.library || !args.category) {
    console.error('Usage: node scripts/generate-component-docs.js --library core --category actions Button Input');
    console.error('');
    console.error('  --library   Required. One of: core, ds-customer, ds-drivers');
    console.error('  --category  Required. One of: actions, inputs, pickers, navigation,');
    console.error('                        indicators-and-states, content-display, messaging, containers-and-design');
    process.exit(1);
  }

  const library = args.library;
  const category = args.category;

  const templatePath = path.join(process.cwd(), 'templates', 'component-page-template.mdx');
  const rulesTemplatePath = path.join(process.cwd(), 'templates', 'component-rules-template.md');

  if (!fs.existsSync(templatePath)) {
    console.error(`Missing template: ${templatePath}`);
    process.exit(1);
  }

  if (!fs.existsSync(rulesTemplatePath)) {
    console.error(`Missing rules template: ${rulesTemplatePath}`);
    process.exit(1);
  }

  const pageTemplate = fs.readFileSync(templatePath, 'utf8');
  const rulesTemplate = fs.readFileSync(rulesTemplatePath, 'utf8');

  args.names.forEach((rawName) => {
    const kebab = toKebabCase(rawName);
    const pascal = toPascalCase(rawName);
    const componentDir = path.join(process.cwd(), 'components', library, category, kebab);

    ensureDir(componentDir);

    const indexContent = pageTemplate
      .replaceAll('{{componentName}}', pascal)
      .replaceAll('{{componentFileName}}', kebab)
      .replaceAll('{{overview}}', 'TODO: Add overview.')
      .replaceAll('{{anatomyText}}', 'TODO: Describe the anatomy.')
      .replaceAll('{{variantsText}}', 'TODO: Describe supported variants.')
      .replaceAll('{{variantsRenderBlock}}', '')
      .replaceAll('{{statesText}}', 'TODO: Describe supported states.')
      .replaceAll('{{tokensSpecsIntro}}', 'TODO: Summarize the component specifications and relevant tokens.')
      .replaceAll('{{supportedVariantsList}}', '- TODO')
      .replaceAll('{{supportedSizesList}}', '- TODO')
      .replaceAll('{{supportedStatesList}}', '- TODO')
      .replaceAll('{{tokensTable}}', '| Token | Value |\n| --- | --- |\n| TODO | TODO |')
      .replaceAll('{{usageGuidelines}}', 'TODO: Add usage guidance.')
      .replaceAll('{{accessibilityGuidelines}}', 'TODO: Add accessibility guidance.')
      .replaceAll('{{doDontText}}', 'TODO: Explain good and bad usage patterns.')
      .replaceAll('{{figmaLink}}', 'TODO')
      .replaceAll('{{codeLink}}', 'TODO');

    const rulesContent = rulesTemplate.replaceAll('{{componentName}}', pascal);

    const specsContent = JSON.stringify(
      {
        component: pascal,
        variants: [],
        sizes: [],
        states: [],
        anatomyParts: [],
        notes: []
      },
      null,
      2
    );

    const tokensContent = JSON.stringify(
      {
        component: pascal,
        tokens: {}
      },
      null,
      2
    );

    const figmaLinksContent = `# ${pascal} Figma links

## Main component
TODO

## Anatomy frame
TODO

## States frame
TODO

## Variants frame
TODO

## Do / Don't frame
TODO
`;

    const tsxContent = `export function ${pascal}() {
  return null;
}
`;

    writeIfMissing(path.join(componentDir, 'index.mdx'), indexContent);
    writeIfMissing(path.join(componentDir, 'component-rules.md'), rulesContent);
    writeIfMissing(path.join(componentDir, 'figma-links.md'), figmaLinksContent);
    writeIfMissing(path.join(componentDir, `${kebab}.tsx`), tsxContent);
    writeIfMissing(path.join(componentDir, `${kebab}.specs.json`), specsContent);
    writeIfMissing(path.join(componentDir, `${kebab}.tokens.json`), tokensContent);

    createEmptyFileIfMissing(path.join(componentDir, 'anatomy.png'));
    createEmptyFileIfMissing(path.join(componentDir, 'states.png'));
    createEmptyFileIfMissing(path.join(componentDir, 'variants.png'));
    createEmptyFileIfMissing(path.join(componentDir, 'do-dont.png'));
    createEmptyFileIfMissing(path.join(componentDir, 'examples.png'));
  });
}

main();