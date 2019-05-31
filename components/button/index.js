import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/index.less';

export default class Button extends Component  {
    render() {
        return <button className="btn">{this.props.text}</button>
    }
}
Button.propTypes = {
    text: PropTypes.any
}
