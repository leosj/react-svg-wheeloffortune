import React from 'react';
import ReactDOM from 'react-dom';

import Svgwheeloffortune from './Svgwheeloffortune';

let svgConfig = {
	colors: [],
	wheelR: 250,
	textR: 200,
	texts: ['一等奖','二等奖','三等奖','四等奖','谢谢参与']
}

ReactDOM.render(<Svgwheeloffortune {...svgConfig} />, document.getElementById('root'));
