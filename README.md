### 使用svg画大转盘抽奖

- 全使用svg来画
- 根据传入的参数来生成对应的转盘
- 传入参数灵活，满足大部分场景下的转盘需求

[![大转盘](http://i.imgur.com/oi0XXgo.png "大转盘")](http://i.imgur.com/oi0XXgo.png "大转盘")

#### 使用方法

```javascript
import Svgwheeloffortune from './Svgwheeloffortune';

let svgConfig = {
	colors: ['#ddd', '#ff0000', '#8e8b8b','#000'],//每个转盘块的颜色
	wheelR: 250,//转盘的半径
	textR: 200,//转盘文字弧形的半径
	texts: ['一等奖','二等奖','三等奖','四等奖','谢谢参与']//每个转盘块上面的文字
}

ReactDOM.render(<Svgwheeloffortune {...svgConfig} />, document.getElementById('root'));
```
