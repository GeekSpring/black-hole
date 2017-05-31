const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('feeRecord', Mock.mock({
  'data|4': [
    {
      //"tnrOpt": "string,贷款期限",
      //"mtdTyp": "string,还款方式",
      //"specialInd": "string,阶段差异利率",
      //"intRat": "string,客户年利率",
      //"fixedOdInd": "string,固定罚息利率",
      //"odIntRate": "string,罚息利率"
      "key|+1": 0,
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
    },
  ],
  page: {
    total: 4,
    current: 1,
  },
}))

let salesPrtData = global[dataKey]

module.exports = {

  'GET /api/feeRecord' (req, res) {
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
  'POST /api/feeRecord' (req, res) {
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

  'DELETE /api/feeRecord' (req, res) {
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

  'PUT /api/feeRecord' (req, res) {
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
