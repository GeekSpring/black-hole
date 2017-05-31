# caxs-mars



## 特性

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践。
-   基于Antd UI 设计语言，提供后台管理系统常见使用场景。
-   基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载。
-   使用[roadhog](https://github.com/sorrycc/roadhog)本地调试和构建，其中Mock功能实现脱离后端独立开发。
-   浅度响应式设计。


## 开发构建

### 目录结构

```bash
├── mock             # 数据mock
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`Table`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Table`）,组件文件首字母大写(如`CheckBoxTable`)。
-   routes：页面为单位以文件夹保存，文件夹名首字母小写(以业务区分文件夹,如`/serviceparams/loantype`),文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹,具体页面文件以routes结尾(如`loanTypeRoutes.js ,...Routes.js`)。
-   models：页面数据模型为单位以文件夹保存，文件夹名首字母小写(以业务区分文件夹,如`/serviceparams/loantype`)，具体页面文件以models结尾(如`loanTypeModels.js ,...Models.js`)。
-   services：数据接口文件以文件夹保存，文件夹名首字母小写(以业务区分文件夹,如`/serviceparams/loantype`)，具体数据文件以services结尾(如`loanTypeServices.js ,...Services.js`)。
-   mock：在没有后台数据情况下的模拟数据接口mock,文件夹名首字母小写(以业务区分文件夹,如`/serviceparams/loantype`)，具体数据文件以services结尾(如`loanTypeMock.js ,...Mock.js`)。

### 快速开始
环境准备:

    `安装了node环境和git`
配置：

    `运行 git bash输入以下命令：
    设置名称：git config --global user.name "liyingchun"
    设置邮箱：git config --global user.email "liyingchun@caxins.com"
    查看设置是否设置成功：git config --global user.email`
创建develop分支切换到该分支：

      git checkout -b develop

克隆项目文件:

    git clone  http://10.10.8.201/caxs/caxs-mars.git

进入目录安装依赖:

    npm i 

运行：

```bash
npm start
打开 http://localhost:3000
```



