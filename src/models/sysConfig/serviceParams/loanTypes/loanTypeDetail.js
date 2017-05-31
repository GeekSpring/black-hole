import { query, create, update, remove} from '../../../../services/loanTypeDetail'
import { parse } from 'qs'

export default {
  namespace: 'loanTypeDetail', //数据models的名称，在component的connect中用
  state: {
    loanTyp: {},
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
    querySuccess (state, action) {
      const { loanTyp } = action.payload
      return { ...state,
        loanTyp  //将state中的数据return给component
        }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            loanTyp: data.loanTyp.data   //获取返回的数据
          },
        })
      }
    },
    *create({ payload }, { call, put }){
      yield put({type: 'hideModal'})
      const data = yield call(create, payload)
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            pagination:{
              total:data.page.total,
              current:data.page.current,
            }
          }
        })
      }
    },
    *update({payload},{select,call,put}){
      yield put({type: 'hideModal'});
      /**
       * select 查询某个命名空间下的     : 'loanTypes' 的某个state状态
       */
      const id = yield select(({loanTypes})=>loanTypes.currentItem.id)
      const newLoanType={...payload,id}
      const data=yield call(update,newLoanType)
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            pagination:{
              total:data.page.total,
              current:data.page.current,
            }
          }
        })
      }
    },
    *'delete'({payload}, {call, put}){
      const data = yield call(remove, {id: payload})
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.query.id) {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
};
