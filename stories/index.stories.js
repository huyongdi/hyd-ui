import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Welcome } from '@storybook/react/demo';
import Button from "../components/button";

storiesOf('Button', module).add('演示按钮', () => <Button text={1234}></Button> );

