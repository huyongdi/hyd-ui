
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { name, repository, version } from "../package.json"
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
console.log(withOptions);

addDecorator(withOptions({
  name: `${name} v${version}`,
  url: repository,
  sidebarAnimations: true,
}))
configure(loadStories, module);
