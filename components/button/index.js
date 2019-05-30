import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class button extends Component  {
    render() {
        return <button className="btn">{this.props.text}</button>
    }
}
button.propTypes = {
    text: PropTypes.any
}
