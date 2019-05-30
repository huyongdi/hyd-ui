import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.less';

export default class button extends Component  {
    render() {
        console.log(style); 
        return <button className={style.btn}>{this.props.text}</button>
    }
}
button.propTypes = {
    text: PropTypes.any
}
