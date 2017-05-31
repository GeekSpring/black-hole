const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('costsSetList', Mock.mock({
  'data|50': [
    {
      'id|+1': 1,
      typCde: /[a-z][A-Z][0-9]{4}$/,
      'typDesc':  {    /*贷款品种描述*/
        value () {
          return Mock.Random.csentence(3, 5)
        },
        editable:false,
        tagType:'input'
      },
      'feeDesc':  {   /*费用描述*/
        value () {
          return Mock.Random.csentence(3, 5)
        },
        editable:false,
        tagType:'button'
      },
      'sts':  {  /*状态*/
        'value|1':[
          "生效",
          "不生效"
        ],
        editable:false,
        tagType:'select'
      },
      'actions':  { /*费用明细*/
        value:'查看',
        editable:false,
        tagType:'p'
      },
      'rpymOrdPriority':  {    /*扣款顺序优先级*/
        'value|1-10': 1,
        editable:false,
        tagType:'inputNum'
      },
   /*   costsCode: /[a-z][A-Z][0-9]{4}$/,
      feeTnrTyp: /[a-z][A-Z][0-9]{4}$/,
      feeMinTnr: /[a-z][A-Z][0-9]{4}$/,
      feeMaxTnr: /[a-z][A-Z][0-9]{4}$/,
      loanMinAmt: /[a-z][A-Z][0-9]{4}$/,
      loan_max_amt: /[a-z][A-Z][0-9]{4}$/,
      tnr_unit: /[a-z][A-Z][0-9]{4}$/,
      fee_action_typ: /[a-z][A-Z][0-9]{4}$/,
      fee_pct_base: /[a-z][A-Z][0-9]{4}$/,
      fee_tnr_str: /[a-z][A-Z][0-9]{4}$/,
      fee_tnr_end: /[a-z][A-Z][0-9]{4}$/,
      fee_pct: /[a-z][A-Z][0-9]{4}$/,
      fee_fix_amt: /[a-z][A-Z][0-9]{4}$/,
      fee_min_amt: /[a-z][A-Z][0-9]{4}$/,
      fee_max_amt: /[a-z][A-Z][0-9]{4}$/,
      fee_acc_ind: /[a-z][A-Z][0-9]{4}$/,
      seq: /[a-z][A-Z][0-9]{4}$/,
      fee_cde: /[a-z][A-Z][0-9]{4}$/,
      last_chg_dt: /[a-z][A-Z][0-9]{4}$/,
      last_chg_usr: /[a-z][A-Z][0-9]{4}$/,
      'age|11-99': 1,
      address: '@cou(true)',
      //dataType: '@boolean',
      "dataType|1": [
        "生效",
        "待生效",
        "失效",
      ],
      entryTime: '@datetime',
      costsDescription () {
        return Mock.Random.csentence(3, 5)
      },
      costsType () {
        return Mock.Random.csentence(3, 5)
      },
      fee_tnr_typ () {
        return Mock.Random.csentence(3, 5)
      },
      fee_min_tnr () {
            return Mock.Random.csentence(3, 5)
          },
      fee_max_tnr () {
            return Mock.Random.csentence(3, 5)
          },*/
    },
  ],
  page: {
    total: 10,
    current: 5,
  },
}))

let costsSetListData = global[dataKey]

module.exports = {

  'GET /api/costsSet' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 2
    const currentPage = page.page || 1
    let data
    let newPage

    let newData = costsSetListData.data.concat()
    if (page.typCde&&page.typCde !='') {
      const d = newData.filter((item) => {
        return item.typCde==page.typCde
      })
      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    }
    else if (page.typDesc&&page.typDesc !='') {
      const d = newData.filter((item) => {
        return item.typDesc==page.typDesc
      })
      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    }
    else {
      data = costsSetListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      costsSetListData.page.current = currentPage * 1
      newPage = costsSetListData.page
    }
    res.json({ success: true, data, page: {pageSize: Number(pageSize),current:newPage.current,total:newPage.total } })
  },
/*
  'POST /api/users' (req, res) {
    const newData = JSON.parse(req.body)
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = usersListData.data.length + 1
    usersListData.data.unshift(newData)

    usersListData.page.total = usersListData.data.length
    usersListData.page.current = 1

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'DELETE /api/users' (req, res) {
    const deleteItem = JSON.parse(req.body)

    usersListData.data = usersListData.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'PUT /api/users' (req, res) {
    const editItem = JSON.parse(req.body)

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },*/

}
