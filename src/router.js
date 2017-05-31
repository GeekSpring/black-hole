import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
// import pathToRegexp from 'path-to-regexp'
import App from './routes/app'


// git push test
const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const Routers = function ({ history, app }) {
  const handleChildRoute = ({ location, params, routes }) => {
    //console.log(location, params, routes)
  }

  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/IndexPage') })
        }, 'index')
      },
      childRoutes: [
        {
          path: '/users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users'))
            }, 'users')
          },
        },  {
          path: '/sysConfig/serviceParams/loanTypes',   /*贷款品种*/
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/loanTypes'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/salesPrt'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/feeRecord'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/templet'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/loanTypExt'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/costsSet'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/loanTypeCdt'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/coopr'))
              cb(null, require('./routes/sysConfig/serviceParams/loanTypes'))
            }, 'loanTypes')
          },
        },{
          path: 'sysConfig/serviceParams/loanTypes/detail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/loanTypeDetail'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/pLoanTypMtd'))
              cb(null, require('./routes/sysConfig/serviceParams/loanTypes/LoanTypeAdd'))
            }, 'loanTypeDetail')
          },
        },{
          path: '/sysConfig/serviceParams/specialCase',   /*专案设置*/
          getComponent (nextState, cb) {
            require.ensure([], require => {
             // registerModel(app, require('./models/loanTypes'))
              cb(null, require('./routes/sysConfig/serviceParams/specialCase'))
            }, 'specialCase')
          },
        }, {
          // 历史版本
          path: '/sysConfig/serviceParams/loanTypes/loanTypeHistory',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/loanTypeHistory'))
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/pCommRelRecord'))
              cb(null, require('./routes/sysConfig/serviceParams/loanTypes/LoanTypeHistory'))
            }, 'loanTypeHistory')
          },
        }, {
          path: '/costsSet',   /*费用设置*/
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysConfig/serviceParams/loanTypes/costsSet'))
              cb(null, require('./routes/costsSet'))
            }, 'costsSet')
          },
        }, {
          path: '/IndexPage',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, { component: require('./routes/IndexPage') })
            }, 'index')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  routes[0].childRoutes.map(item => {
    item.onEnter = handleChildRoute
    return item
  })

  return <Router history={history} routes={routes} />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
