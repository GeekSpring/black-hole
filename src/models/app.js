import {login,userInfo} from  '../services/app'
import {parse} from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    user: {},//用户
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'ture',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
    permissions: {
      sysConfig: {
        text: '系统配置',
        route: 'sysConfig',
        },
      users: {
        text: '用户列表',
        route: 'users',
      },
      costsSet: {
        text: '费用设置',
        route: 'costsSet',
      },
    },//用户权限菜单
    userPermissions: [],//用户角色
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    handleChangeTheme(state){
      localStorage.setItem('antdAdminDarkTheme',!state.darkTheme)
      return{
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    handleSwitchSider(state){
     // localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return{
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },

  effects: {
    *queryUser ({
      payload
     },{ call, put }){
      const {success,userPermissions,username}=yield call(userInfo,parse(payload))
      if(success){
        yield put({
          type: 'loginSuccess',
          payload:{
            userPermissions,
            user:{
              username,
            }
          }
        })
      }
    },
    *changeTheme ({payload,}, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *switchSider ({payload,}, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *login ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const { success, userPermissions, username } = yield call(login, parse(payload))
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userPermissions,
            user: {
              name: username,
            },
          } })
      } else {
        yield put({
          type: 'loginFail',
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' })
    }
  },

};
