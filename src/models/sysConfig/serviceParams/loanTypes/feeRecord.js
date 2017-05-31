
//贷款品种编辑编辑表格model
import { query, create, update, remove} from '../../../../services/feeRecord'
import { parse } from 'qs'

export default {
  namespace: 'feeRecord',
  state: {
    dataSourceMtd: [],
    oldDataSourceMtd: [],
    editIndex:null,
    returnVa:null,
    count: null,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    addFlag:true,
    addArr:[],
    doViewType:'doView',/*查看费用明细*/
    feeDescType:'feeDesc',/*费用描述*/
    visible:false,
    doViewModalVisible:false,
    feeDescModalVisible:false,
    selectedRows:[],
  },
  reducers: {

    /*选中返回的数据*/
    //选择当前的radio
    selectedRow(state,action){
      return {
        ...state,
        selectedRows:action.payload.selectedRows,
      }
    },//清空当前的radio
    selectedRowClear(state,action){
      return {
        ...state,
        selectedRows:[],
      }
    },
    // push新的数据到state里面
    returnNewData(state,action){
      state.dataSourceMtd=action.payload.selectedRows;
      debugger;
      return {
        ...state,
        dataSourceMtd,
      }

    },
    //更新选中数据
    saveEditIndex(state,action){
      state.editIndex=action.payload.editIndex;
      return{
        ...state,
        ...action.payload,
      }
    },
    //更新选中数据
    updateSelectData(state,action){
      debugger;
      state.dataSourceMtd[state.editIndex].feeDesc.value=action.payload.selectedValue.value;
      state.dataSourceMtd[state.editIndex].feeDesc.editable=true;
      state.dataSourceMtd[state.editIndex].key= -(state.dataSourceMtd[state.editIndex].key)
      state= JSON.parse(JSON.stringify(state));

      return{
        ...state,
      }
    },

    showModal(state,action){  /*费用设置*/
      return {
        ...state,
        ...action.payload,
        visible: true
      }
    },
    hideModal(state){
      return{
        ...state,
        visible:false,
        addFlag:true
      }
    },
    doViewShowModal(state,action){  /*查看费用明细*/
      return {
        ...state,
        ...action.payload,
        doViewModalVisible: true
      }
    },
    doViewHideModal(state){
      return{
        ...state,
        doViewModalVisible:false,
      }
    },
    feeDescShowModal(state,action){  /*费用描述*/
      return {
        ...state,
        ...action.payload,
        feeDescModalVisible: true
      }
    },
    feeDescHideModal(state){
      return{
        ...state,
        feeDescModalVisible:false,
        addFlag:true
      }
    },
    // 查询成功
    querySuccess (state, action) {
      const { dataSourceMtd, pagination } = action.payload
      state.count=pagination.total
      return {
        ...state,
        dataSourceMtd,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    //显示编辑控件
    showInput(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.item].editable=true;
      state.dataSourceMtd[action.payload.index][action.payload.item].status=action.payload.type;

       //debugger
      return {
        ...state,
        ...action.payload
      }
    },
    //显示编辑控件
    hideInput(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.item].editable=false;
      state.dataSourceMtd[action.payload.index][action.payload.item].status=action.payload.type;
      return {
        ...state,
        ...action.payload
      }
    },
    // push新的数据到state里面
    pushNewData(state,action){
      state.dataSourceMtd.unshift(action.payload.newData);
      state.addArr.push(action.payload.newData);
      state.count=action.payload.count;
      state.addFlag=false;
      return {
        ...state,
        ...action.payload
      }
    },
    // 清空addArr数组
    clearAddArr(state,action){
      state.addArr=[];
      state.addFlag=true;
      ////debugger;
      return {
        ...state,
        ...action.payload
      }
    },
    // changeKey
    changeKey(state,action){
      state.count=action.payload.count;
      return {
        ...state,
        ...action.payload
      }
    },
    // changePage
    changePage(state,action){
      state.pagination.total=state.dataSourceMtd.length;
      return {
        ...state,
        ...action.payload
      }
    },
    // 取消编辑表格数据
    cancelSave(state,action){
      ////debugger;
      state.dataSourceMtd[action.payload.index]=action.payload.oldData;
      return {
        ...state,
      }
    },
    // 修改表格数据
    changeValue(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.keyName].value = action.payload.value;
      state.dataSourceMtd[0][action.payload.selectedValue].feeDesc.value = action.payload.selectedValue;
      return {
        ...state,
        ...action.payload
      }
    },
    // 删除单行数据
    deleteCol(state,action){
      state.dataSourceMtd = action.payload.dataSourceMtd;
      debugger
      return {
        ...state,
      }
    },
    // 修改表格数据
    saveOldData(state,action){
      //克隆对象
      const str = JSON.stringify(action.payload.oldData); //序列化对象
      const oldData = JSON.parse(str);
      state.oldDataSourceMtd.push(oldData);
      console.log(oldData)
      return {
        ...state,
      }
    },
    //高级搜索--简单搜索
    changeBtnType(state,action){
      ////debugger;
      let flag=action.payload.changeBtn;
      return{
        ...state,
        changeBtn:!flag,
      }
    },
  },

  effects: {
    //查询数据
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSourceMtd: data.data,
            pagination: data.page,
          },
        })
      }
    },
    //删除
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
    /*setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sysConfig/serviceParams/loanTypes') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },*/
  }
};
