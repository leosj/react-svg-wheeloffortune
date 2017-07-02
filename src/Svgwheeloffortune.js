import React from 'react'
import PropTypes from 'prop-types'

const Svgwheeloffortune = ({colors,wheelR,textR,texts}) => {

	const pieces = texts.length || 5 // 大转盘总共有几块

	colors = Object.assign(['#ddd','#ececec','#f9f9f9'],colors) //让用户传进来的颜色覆盖本来的颜色
	let angle = 360/pieces // 计算大转盘每个面的角度

	let path = '';

	let startx = wheelR, starty = 0 //画圆的起点
	let startxtext = wheelR, startytext= wheelR-textR //文字圆弧的起点

	for(let i=1;i<=pieces;i++) {
		let x = Math.sin(Math.PI/180*angle*i)*wheelR + wheelR //计算画圆的下一个订单的x坐标
		let y = wheelR - Math.cos(Math.PI/180*angle*i)*wheelR //计算画圆的下一个订单的y坐标

		let xtext = Math.sin(Math.PI/180*angle*i)*textR + textR+(wheelR-textR) //计算文圆弧的下一个订单的x坐标
		let ytext = textR - Math.cos(Math.PI/180*angle*i)*textR+(wheelR-textR) //计算文圆弧的下一个订单的y坐标

		//计算每个块的填充颜色，防止出现两块相近的块颜色一样
		let mycolor = '';
			mycolor = colors[(i-1)%colors.length];

		if(i === pieces && mycolor === colors[0]) {
			mycolor = colors[1];
		}


		path += '<path  d="M'+wheelR+' '+wheelR+' L'+startx+' '+starty+' A'+wheelR+','+wheelR+',0,0,1,'+x+','+y+'  L'+wheelR+' '+wheelR+' Z" fill="'+mycolor+'" stroke="'+mycolor+'"/>' //画一个扇形

		if(texts[i-1]) {
			path += '<defs><path  id="p'+i+'" d="M'+startxtext+' '+startytext+' A'+textR+','+textR+',0,0,1,'+xtext+','+ytext+'" fill="'+mycolor+'" stroke="'+mycolor+'"/></defs>';

			path += '<text id="svgtext'+i+'" style="font-size: 24px;" > ';
			 path += '   <textPath xlink:href="#p'+i+'" startOffset="50%" text-anchor="middle">  ';
			 path += texts[i-1];
			path += '    </textPath>  ';
			path += '</text> ';
		}

		startx = x;
		starty = y;
		startxtext = xtext;
		startytext = ytext;
	}

	return (
		<svg height={wheelR*2} width={wheelR*2} dangerouslySetInnerHTML={{__html: path}}></svg>
	)

}

Svgwheeloffortune.propTypes = {
	colors: PropTypes.array.isRequired,
	wheelR: PropTypes.number.isRequired,
	textR: PropTypes.number.isRequired,
	texts: PropTypes.array.isRequired
}

export default Svgwheeloffortune
