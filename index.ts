import { process } from './src/index'
const raf = requestAnimationFrame

function main() {
  const $article = document.querySelector('article') as HTMLElement
  $article.innerHTML = testDom2
}

function shuffleTest() {
  const $article = document.querySelector('article') as HTMLElement
  $article.innerHTML = testDom2

  const p = $article.querySelectorAll('p').forEach(($p) => {
    process($p)
  })

  const $raw = document.querySelector('article.raw')
  raf(() => {
    const $article = document.querySelector('article') as HTMLElement

    // $raw.textContent = $article.textContent

    $raw.innerHTML = $article.innerHTML
  })
}

document.getElementById('process').onclick = shuffleTest

const testDom = `
<p>    燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？——是有人偷了他们罢：那是谁？又藏在何处呢？是他们自己逃走了罢：现在又到了哪里呢？</p>
<p>　　我不知道他们给了我多少日子；但我的手确乎是渐渐空虚了。在默默里算着，八千多日子已经从我手中溜去；像针尖上一滴水滴在大海里，我的日子滴在时间的流里，没有声音，也没有影子。我不禁头涔涔而泪潸潸了。</p>
<p>　　去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。</p>
<p>　　在逃去如飞的日子里，在千门万户的世界里的我能做些什么呢？只有徘徊罢了，只有匆匆罢了；在八千多日的匆匆里，除徘徊外，又剩些什么呢？过去的日子如轻烟，被微风吹散了，如薄雾，被初阳蒸融了；我留着些什么痕迹呢？我何曾留着像游丝样的痕迹呢？我赤裸裸来到这世界，转眼间也将赤裸裸的回去罢？但不能平的，为什么偏要白白走这一遭啊？</p>
<p>　　你聪明的，告诉我，我们的日子为什么一去不复返呢？</p>
`

const testDom2 = `<h1 id="-">杭州之行</h1>
<p>当我完成这篇文章的时候，我已经从杭州回来了。过去的三天我开始了人生中第一段独自旅行。温州——杭州。由于不熟悉杭州加之酒店定的比较早，位置选的不好，导致几乎一半时间都在坐地铁。<del>我大概是来坐地铁的。</del></p>
<!-- 第一次与网友面基，第一次独自来到一个陌生的城市，第一次坐地铁，第一次住酒店，第一次感受到了大城市的人流量。 -->
<p>假期第一天，中午从温州出发，下午 3 点到达杭州东站，已出车站我便迷失在了人海里。<a href="https://qaq.wiki">@Lakr</a> 已经在等我了，在人海中接到了我。然后先去酒店放行李。之后便去了附近的一家海底捞，不得不说海底捞的服务太周到，很容易让人社死，第一次吃海底捞，我全程在一边只顾吃，有点尴尬。之后就被带到了西湖文化广场，距离很远，需要转一次地铁。</p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620045936941.png" alt=""></p>
<p>在运河边转了一会后，去看了「名侦探柯南：绯色的子弹」，此时已过八半点，电影结束的话要十点半了，外加一个钟的地铁等我回到酒店预估半夜了。在观影过程中，我迷迷糊糊，同时感觉走了一天了，感觉到有点胸闷。电影结束后我赶紧坐上了回程的地铁，结束了匆忙又劳累的一天。不幸的是，我又失眠了。</p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620046430394.jpeg" alt="!防走丢的 AirTag"></p>
<p>不知道何时入睡的我，开启了第二天的行程。计划在中午和高中同学<a href="https://kuukikun.github.io/">@空気</a>在杭师大仓前地铁口会面，随后去了万象城。吃过午饭，寒暄许久后，逛了会周边，参观了下 Apple 万象城，随后他踏上了回家的路途，我回到了暂住的酒店，准备休息片刻晚上继续行程。</p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620047262407.png" alt="!去程-回程 来回2小时"></p>
<p>吃过晚饭，准备再次出发，这次的目标的是，西湖周边的银泰（Apple·西湖）。抵达目的地仍然需要一个小时地铁。<del>其实我内心还是很崩溃的，要怪也只能怪自己了。</del></p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620047481324.png" alt=""></p>
<p>一出地铁，就感受到了好似春运的气息——人挤人。</p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620047808962.JPG" alt="!1号线——龙翔桥站C，银泰内部"></p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620047873414.jpeg" alt="!出口处的十字路口"></p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/1620047897808.jpeg" alt="!绿灯时的短暂平静，人满为患"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/05032119.jpeg" alt="!地铁口的 Apple·西湖"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503214006.jpeg" alt="!周边小巷"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503212258.jpeg" alt="!西湖旁"></p>
<p>就这样一天的行程又结束了，明天就要结束一段旅途了。在回程的路上，我见识到了晚 9 点过半的钉钉大楼，灯火通明。</p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503212634.jpeg" alt="!钉钉空间 —— 拍摄于晚9:43"></p>
<p>第三天，也是留在杭州的最后一天了。早上 9 点吃过早餐之后开始独自的行程安排。先是找了辆单车，在周围兜了一圈，随后去了亲橙里购物中心，这里几乎没有人，显得冷冷清清。</p>
<p><img src="https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0503213437.png" alt="!离阿里园区还是挺近的，旁边园区C还在动工"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503213618.jpeg" alt="!商场内的阿里动物园手办"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503213707.jpeg" alt=""></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503213733.jpeg" alt="!鸟瞰"></p>
<p><img src="https://tu-1252943311.cos.accelerate.myqcloud.com/bed/2021/0503214123.jpeg" alt="!入口 —— 暗示天猫的地位：只能用来垫脚？"></p>
<p>之后，回到酒店，整理行李，踏上归途了。这三天，过得很快，也很累。离开的那一刻，再次感受到了空虚，大概这就是旅行吧。一个不属于自己的地方。</p>
`
main()
