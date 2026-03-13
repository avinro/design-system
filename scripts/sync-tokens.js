const fs = require('fs');
const path = require('path');

function getJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated: ${filePath}`);
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
    console.error('Usage: node scripts/sync-tokens.js --library core --category actions button');
    console.error('');
    console.error('  --library   Required. One of: core, ds-customer, ds-drivers');
    console.error('  --category  Required. One of: actions, inputs, pickers, navigation,');
    console.error('                        indicators-and-states, content-display, messaging, containers-and-design');
    process.exit(1);
  }

  const componentName = args.name.toLowerCase();
  const componentTokenPath = path.join(process.cwd(), 'components', args.library, args.category, componentName, `${componentName}.tokens.json`);

  const sharedColors = getJson(path.join(process.cwd(), 'tokens', 'colors.json')) || {};
  const sharedSpacing = getJson(path.join(process.cwd(), 'tokens', 'spacing.json')) || {};
  const sharedTypography = getJson(path.join(process.cwd(), 'tokens', 'typography.json')) || {};
  const sharedRadius = getJson(path.join(process.cwd(), 'tokens', 'radius.json')) || {};
  const sharedShadows = getJson(path.join(process.cwd(), 'tokens', 'shadows.json')) || {};

  const current = getJson(componentTokenPath) || {
    component: componentName,
    tokens: {}
  };

  const merged = {
    component: current.component || componentName,
    tokens: {
      ...current.tokens,
      _shared: {
        colors: sharedColors,
        spacing: sharedSpacing,
        typography: sharedTypography,
        radius: sharedRadius,
        shadows: sharedShadows
      }
    }
  };

  writeJson(componentTokenPath, merged);
}

main();