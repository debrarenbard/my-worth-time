# 你每分钟值多少钱？

## 🧠 产品目标：
用户输入自己的月薪和上班时间后，页面实时展示自己每秒钟和每分钟赚了多少钱，并且页面上会有金币从上往下掉落，作为可视化的奖励反馈。

## 📋 用户输入：
- 月薪（人民币，number）
- 每天上班时间（开始时间 + 结束时间，HH:mm）
- 每周工作几天（默认 5）

## 💡 功能需求：
- 计算每分钟工资：  
  `月薪 ÷ （每日工作小时 × 每周工作天数 × 4周 × 60分钟）`
- 实时计时器，每秒更新收入
- 页面展示内容：
  - 每秒工资
  - 每分钟工资
  - 累计已赚金额（从用户点击开始那一刻开始）
- 按钮交互：
  - 🚀 按钮文本替换为：[ 开始计时，我要赚钱了！ ]
  - 另有 [暂停]、[重置] 按钮
- 情绪激励提示：
  - 每累计赚满 100 元，弹出提示：「你可以买一杯精品咖啡了！」
  - 每累计赚满 1000 元，弹出提示：「你已经值下一台 Kindle 了！」
- 金币掉落动画（SVG / CSS / Canvas 均可）
  - 金币数量随收入增加而加密（每赚 1 元掉 1 枚金币）

## 🎨 UI 设计建议：
- 使用 Tailwind CSS 构建现代化简洁页面
- 页面结构：
  - 顶端：标题banner 你每分钟值多少钱？
  - 上部：表单 + 收入信息
  - 中部：实时金额 + 鼓励语句
  - 下部：金币动画区域
- 动画流畅不卡顿，背景可适度动态增强参与感
- 鼓励语用渐显 /弹窗形式出现，不打断主页面功能

## 📱 移动端适配：
- 输入区域适应触屏输入
- 动画区域轻量防卡顿
- 响应式布局适应不同屏幕尺寸
