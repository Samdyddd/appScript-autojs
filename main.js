"ui";
const OPERATION_DELAY = 6000
let list = [
  new AppObject('Cpdaily', '今日校园', 'com.wisedu.cpdaily'),
  new AppObject('Fliggy', '飞猪', 'com.taobao.trip'),
  new AppObject('JD', '京东', 'com.jingdong.app.mall'),
  new AppObject('JianShu', '简书', 'com.jianshu.haruki'),
  new AppObject('Msg', '口袋梦三国', 'com.dh.mengsanguoolex'),
  new AppObject('Bilibili', '哔哩哔哩', 'tv.danmaku.bili'),
  new AppObject('Alipay', '支付宝', 'com.eg.android.AlipayGphone', 1500),
  new AppObject('Taobao', '淘宝', 'com.taobao.taobao'),
  new AppObject('QQMusic', 'QQ音乐', 'com.tencent.qqmusic'),
  new AppObject('BaiduMap', '百度地图', 'com.baidu.BaiduMap'),
  new AppObject('Ele', '饿了么', 'me.ele'),
  new AppObject('Pinduoduo', '拼多多', 'com.xunmeng.pinduoduo'),
  new AppObject('Meituan', '美团', 'com.sankuai.meituan'),
  new AppObject('Tieba', '百度贴吧', 'com.baidu.tieba'),
  new AppObject('QDReader', '起点读书', 'com.qidian.QDReader'),
  new AppObject('CloudMusic', '网易云音乐', 'com.netease.cloudmusic'),
  new AppObject('Dianping', '大众点评', 'com.dianping.v1'),
  new AppObject('Wifimanager', '腾讯wifi管家', 'com.tencent.wifimanager'),
  new AppObject('Karaoke', '全民K歌', 'com.tencent.karaoke'),
]

ui.layout(
  <horizontal>
    <radiogroup>
      <checkbox id="Alipay" text="支付宝签到积分"></checkbox>
      <checkbox id="Fliggy" text="飞猪签到里程"></checkbox>
      <checkbox id="JianShu" text="简书转盘抽奖"></checkbox>
      <checkbox id="Meituan" text="美团红包签到"></checkbox>
      <checkbox id="Wifimanager" text="腾讯wifi管家"></checkbox>
    </radiogroup>
    <radiogroup>
      <checkbox id="CloudMusic" text="网易云音乐"></checkbox>
      <checkbox id="Msg" text="口袋梦三国"></checkbox>
      <checkbox id="QQMusic" text="QQ音乐"></checkbox>
      <checkbox id="Pinduoduo" text="拼多多"></checkbox>
      <checkbox id="Ele" text="饿了么"></checkbox>
      <checkbox id="Taobao" text="淘宝"></checkbox>
      <checkbox id="JD" text="京东"></checkbox>
    </radiogroup>
    <radiogroup>
      <checkbox id="Bilibili" text="哔哩哔哩"></checkbox>
      <checkbox id="Cpdaily" text="今日校园"></checkbox>
      <checkbox id="Tieba" text="百度贴吧"></checkbox>
      <checkbox id="BaiduMap" text="百度地图"></checkbox>
      <checkbox id="QDReader" text="起点读书"></checkbox>
      <checkbox id="Dianping" text="大众点评"></checkbox>
      <checkbox id="Karaoke" text="全民K歌"></checkbox>
    </radiogroup>
    <button id="confirm" text="确定" />
  </horizontal>
)

ui.confirm.click(() => {
  threads.start(function () {
    main()
  })
})

/**
 * app基类构造方法
 *
 * @param {string} id app英文名称
 * @param {string} name app名称
 * @param {string} packageName app的包名
 * @param {number} startUpDelay 启动app的延迟时间，单位毫秒; 默认5000
 */
function AppObject(id, name, packageName, startUpDelay) {
  const defaultStartUpDelay = 5000

  this.id = id
  this.name = name
  this.packageName = packageName
  this.startUpDelay = startUpDelay || defaultStartUpDelay

  /**
   * 点击控件
   *
   * @param {Widget} widget 控件
   */
  this.click = (widget) => {
    // 控件不存在
    if (!widget) {
      return false
    }

    // 控件可点击
    if (widget.clickable() === true) {
      return widget.click()
    }

    let rect = widget.bounds()
    return click(rect.centerX(), rect.centerY())
  }

  /**
   * 运行app
   */
  this.launch = () => {
    app.launchPackage(this.packageName)
  }

  /**
   * 签到
   */
  this.signIn = () => {
    return eval('signIn' + this.id + '()')
  }

  /**
   * 关闭app
   */
  this.killProgress = () => {
    shell('am force-stop ' + this.packageName, true)
  }
}

const APP = new AppObject()

function signInFliggy() {}

function signInJD() {
  text('领京豆').findOne(5000).parent().click()
  text('签到领京豆').findOne(5000).parent().click()
}

/**
 * 简书转盘抽奖
 */
function signInJianShu() {
  APP.click(getOneWidget('tab_mine', 'id'))
  APP.click(getOneWidget('天天抽奖', 'text'))
  APP.click(getOneWidget('android.view.View', 'className'))
  click(560, 1560)
}

function signInMsg() {
  sleep(5000)
  id('home_ll_btn1').findOne().click()
}

function signInBilibili() {
  sleep(3000)
  text('我的').findOne().parent().click()
  sleep(2000)

  text('更多').findOne().parent().click()
}

function signInAlipay() {
  text('我的').findOne(1500).parent().click()
  sleep(2000)
  text('支付宝会员').findOne(1500).parent().click()
  sleep(1500)
  text('领积分').findOne(1500).click()
  sleep(1000)
  for (let i = 0; i < 5; i++) {
    text('点击领取').findOne(1500).parent().click()
    sleep(1500)
  }
}

function signInTaobao() {
  desc('领淘金币').findOne(1500).click()

  text('立即签到').findOne(2000).parent().click()
}

function signInQQMusic() {
  text('我的').findOne(5000).parent().click()
  text('活动中心').findOne(2000).parent().click()
  text('立即领取').findOne(3000).click()
}

function signInBaiduMap() {
  clickWidget(desc('个人中心').findOne(4000).parent())

  clickWidget(text('签  到').findOne(4000))

  clickWidget(
    textMatches(/[0-9]+人已签到/)
      .findOne(4000)
      .parent()
  )

  sleep(1000)
  if (text('立即领取').exists()) {
    text('立即领取').click()
    text('去领金币').findOne(4000).parent().click()

    textMatches(/\+[0-9]+金币/)
      .findOne(4000)
      .click()
  }
}

function signInEle() {
  APP.click(getOneWidget('签到赢饭钱', 'desc'))

  APP.click(getOneWidget('立即签到', 'text'))

  APP.click(getOneWidget('¥', 'text'))

  APP.click(getOneWidget('分享可再翻一次卡牌', 'text'))
  APP.click(getOneWidget('微信', 'text'))
}

/**
 * 今日校园打卡
 */
function signInCpdaily() {
  APP.click(getOneWidget('签到领福利', 'text'))

  APP.click(getOneWidget('点此打卡', 'text'))
}

/**
 * 美团红包签到
 */
function signInMeituan() {
  APP.click(getOneWidget('红包签到', 'desc'))
}

/**
 * 百度贴吧签到
 */
function signInTieba() {
  APP.click(getOneWidget('进吧', 'text'))
  APP.click(getOneWidget('签到', 'desc'))
}

/**
 * 起点读书
 */
function signInQDReader() {
  APP.click(getOneWidget('fClose', 'id'))
  APP.click(getOneWidget(/领[0-9]+点/, 'textMatches'))
  APP.click(getOneWidget('今日奖励翻倍', 'text'))

  // 看广告
  sleep(20 * 1000)
  APP.click(getOneWidget('android.widget.ImageView', 'className')) // 关闭广告
  APP.click(getOneWidget('抽奖', 'text'))

  let flag = false
  while (true) {
    if (APP.click(getOneWidget('抽 奖', 'text'))) {
      flag = true
      continue
    }
    if (APP.click(getOneWidget('看视频抽奖喜+1', 'text'))) {
      sleep(20 * 1000)
      APP.click(getOneWidget('android.widget.ImageView', 'className')) // 关闭广告
      flag = true
      continue
    }

    if (flag === false) {
      break
    }
  }
}

/**
 * 网易云音乐签到
 */
function signInCloudMusic() {
  APP.click(getOneWidget('抽屉菜单', 'desc'))
  APP.click(getOneWidget('签到', 'text'))
}

/**
 * 大众点评签到
 */
function signInDianping() {
  APP.click(getOneWidget('关闭', 'desc', false, 2000))
  APP.click(getOneWidget('我的', 'text'))
  APP.click(getOneWidget('每日福利', 'text'))
  APP.click(getOneWidget('签到领奖', 'text'))
}

/**
 * 腾讯wifi管家签到
 */
function signInWifimanager() {
  APP.click(getOneWidget('sm', 'id', 2000))
  APP.click(getOneWidget('我的', 'text'))
  APP.click(getOneWidget('签到', 'text'))
  APP.click(getOneWidget('b58', 'id', 2000))
}

function signInKaraoke() {
  APP.click(getOneWidget('h7b', 'id'))
  APP.click(getOneWidget('立刻签到', 'desc'))
}

function main() {
  list.forEach((appObject) => {
    let isSelected = ui[appObject.id].checked
    if (isSelected === true) {
      toast(appObject.name)
      appObject.launch()
      APP.click(getOneWidget('跳过', 'textMatches'))
      sleep(2000)
      appObject.signIn()
      // appObject.killProgress()
    }
  })
}
main()

/**
 * 获得一个控件
 *
 * @param {string} str 相关字符串
 * @param {string} method 指定方法，默认text
 * @param {boolean} parent 是否要寻找父控件，默认false
 * @param {number} delay 指定延迟时间，默认OPERATION_DELAY
 */
function getOneWidget(str, method, parent, delay) {
  if (!str) {
    return null
  }

  let method = method || 'text'
  let parent = parent || false
  let delay = delay || OPERATION_DELAY
  let widget = null

  let funcStr = method + "('" + str + "').findOne(" + delay + ')'
  if (parent === false) {
    return (widget = eval(funcStr))
  }

  if (widget === null) {
    return null
  }
  return eval(funcStr + '.parent()')
}
