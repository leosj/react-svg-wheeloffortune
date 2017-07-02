import React from 'react'
import PropTypes from 'prop-types'

const Svgwheeloffortune = ({config}) => {

	const pieces = config.pieces || 5 // 大转盘总共有几块

	let colors = Object.assign(['#ddd','#ececec','#f9f9f9'],config.colors) //让用户传进来的颜色覆盖本来的颜色
	let angle = 360/pieces // 计算大转盘每个面的角度

	let wheelR = config.r || 250 //转盘的半径
	let textR = config.tr || 200 //文字弧度的半径

	let texts = config.texts //给转盘上面的文字一个默认值
	if(!texts) {
		texts = [];
		colors.forEach((v, i) => texts.push((i+1)+'等奖'))
	}

	let startx = wheelR, starty = 0 //画圆的起点
	let startxtext = wheelR, startytext= wheelR-textR //文字圆弧的起点

	let pathObj = [];

	for(let i=1;i<=pieces;i++) {
		let x = Math.sin(Math.PI/180*angle*i)*wheelR + wheelR //计算画圆的下一个订单的x坐标
		let y = wheelR - Math.cos(Math.PI/180*angle*i)*wheelR //计算画圆的下一个订单的y坐标

		let xtext = Math.sin(Math.PI/180*angle*i)*textR + textR+(wheelR-textR) //计算文圆弧的下一个订单的x坐标
		let ytext = textR - Math.cos(Math.PI/180*angle*i)*textR+(wheelR-textR) //计算文圆弧的下一个订单的y坐标

		//计算每个块的填充颜色，防止出现两块相近的块颜色一样
		let mycolor = '';
		if(pieces%2 !== 0) {
			mycolor = colors[(i-1)%3];
		} else {
			mycolor = colors[(i-1)%2];
		}

		if(i === pieces && mycolor === colors[0]) {
			mycolor = colors[1];
		}

		pathObj.push({
			x: x,
			y: y,
			xtext: xtext,
			ytext: ytext,
			color: mycolor,
			i: i,
			text: texts[i-1],
			startx: startx,
			starty: starty,
			startxtext: startxtext,
			startytext: startytext
		})

		startx = x;
		starty = y;
		startxtext = xtext;
		startytext = ytext;
	}

	const contactStr = (str, otherstr) => {
		return str + otherstr
	}

	const getCyclePathLine = (wheelR,startx,starty,x,y) => {
		return 'M'+wheelR+' '+wheelR+' L'+startx+' '+starty+' A'+wheelR+','+wheelR+',0,0,1,'+x+','+y+'  L'+wheelR+' '+wheelR+' Z'
	}

	const getTextPathLine = (textR,startx,starty,x,y) => {
		return 'M'+startx+' '+starty+' A'+textR+','+textR+',0,0,1,'+x+','+y
	}

	return (
		<svg height={wheelR*2} width={wheelR*2}>
		{
			pathObj.map(item =>  {
		      return <path key={item.i} d={getCyclePathLine(wheelR,item.startx,item.starty,item.x,item.y)} fill={item.color} stroke={item.color}>
			  		<defs>
						<path id={contactStr('p',item.i)} d={getTextPathLine(textR,item.startxtext,item.startytext,item.xtext,item.ytext)} fill={item.color} stroke={item.color}></path>
			  		</defs>

			  		<text>
			  			<textPath xlink:href={contactStr('#p',item.i)} startOffset="50%" text-anchor="middle">
			  		 		{item.text}
			  			</textPath>
			  		</text>
				</path>
		    })
		}
		</svg>
	)

}

Svgwheeloffortune.propTypes = {
	config: PropTypes.object.isRequired
}

export default Svgwheeloffortune
