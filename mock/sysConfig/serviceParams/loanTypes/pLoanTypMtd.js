const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('pLoanTypMtd', Mock.mock({
  'data|4': [
    {
      //"tnrOpt": "string,贷款期限",
      //"mtdTyp": "string,还款方式",
      //"specialInd": "string,阶段差异利率",
      //"intRat": "string,客户年利率",
      //"fixedOdInd": "string,固定罚息利率",
      //"odIntRate": "string,罚息利率"
      "key|+1": 0,
      'tnrOpt':  {
        'value|1':[
          "按天",
          "3个月",
          "6个月",
          "12个月",
          "18个月",
        ],
        editable:false,
        tagType:'select'
      },
      'mtdTyp':  {
        'value|1':[
          "等额本息",
          "等额本金",
        ],
        editable:false,
        tagType:'select'
      },
      'specialInd':  {
        'value|1':[
          "是",
          "否"
        ],
        editable:false,
        tagType:'select'
      },
      'fixedOdInd':  {
        'value|1':[
          "是",
          "否"
        ],
        editable:false,
        tagType:'select'
      },
      'intRat':  {
        'value|0-0.99': 1,
        editable:false,
        tagType:'inputNum'
      },
      'odIntRate':  {
        "value|0-0.99": 1,
        editable:false,
        tagType:'button'
      },
    },
  ],
  page: {
    total: 4,
    current: 1,
  },
}))

let salesPrtData = global[dataKey]

module.exports = {

  'GET /api/pLoanTypMtd' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1
    let data
    let newPage

    let newData = salesPrtData.data.concat()
    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = salesPrtData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      salesPrtData.page.current = currentPage * 1
      newPage = salesPrtData.page
    }
    res.json({ success: true, data, page: {pageSize: Number(pageSize),current:newPage.current,total:newPage.total } })
  },
/*
  'POST /api/pLoanTypMtd' (req, res) {
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

  'DELETE /api/pLoanTypMtd' (req, res) {
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

  'PUT /api/pLoanTypMtd' (req, res) {
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
