import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Welcome } from '@storybook/react/demo';
import Button from "../components/Button";
import Button1 from "../components/Button1";

storiesOf('Button', module).add('演示按钮', () => <Button text={1234}></Button> );
storiesOf('Button1', module).add('演示按钮', () => <Button1 text={1234}></Button1> );

