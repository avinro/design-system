const fs = require('fs');
const path = require('path');

function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function parseArgs(argv) {
  const args = { name: null, library: null, category: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--library' && argv[i + 1]) {
      args.library = argv[++i];
    } else if (argv[i] === '--category' && argv[i + 1]) {
      args.category = argv[++i];
    } else {
      args.name = argv[i];
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.name || !args.library || !args.category) {
    console.error('Usage: node scripts/export-figma-assets.js --library core --category actions Button');
    console.error('');
    console.error('  --library   Required. One of: core, ds-customer, ds-drivers');
    console.error('  --category  Required. One of: actions, inputs, pickers, navigation,');
    console.error('                        indicators-and-states, content-display, messaging, containers-and-design');
    process.exit(1);
  }

  const componentName = toKebabCase(args.name);
  const componentDir = path.join(process.cwd(), 'components', args.library, args.category, componentName);

  ensureDir(componentDir);

  const files = [
    'anatomy.png',
    'states.png',
    'variants.png',
    'do-dont.png',
    'examples.png'
  ];

  files.forEach((file) => {
    const targetPath = path.join(componentDir, file);

    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, '');
      console.log(`Prepared placeholder: ${targetPath}`);
    } else {
      console.log(`Already exists: ${targetPath}`);
    }
  });

  console.log('\nNext step: use Claude Code + Figma MCP to export screenshots into these exact file paths.');
  console.log(`Component folder ready: ${componentDir}`);
}

main();