const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('loanTypExt', Mock.mock({
 /* "typCde": "string,贷款品种代码",
  "typDesc": "string,贷款品种描述",
  "wtDuration": "string,申请件整体处理时长",
  "wtUnit": "string,申请件整体处理时长单位",
  "docTnr": "string,补件期限（天）",
  "capInstuCde": "string,资金渠道金融机构",
  "capInstuName": "string,资金渠道金融机构名称"*/
  data:
    {
      typCde: /^CA[246]\d{6}$/,
      typDesc () {
        return Mock.Random.csentence(3, 5)
      },
      wtDuration:1,
      wtUnit:'N',
      docTnr:'N',
      capInstuCde:'Y',
      capInstuName:'N',
    },


}))

let loanTypExt = global[dataKey]

module.exports = {

  'GET /api/loanTypExt' (req, res) {
    res.json({ success: true, loanTypExt })
  },

  'POST /api/loanTypExteee' (req, res) {
    const newData = JSON.parse(req.body)
    newData.entryTime = Mock.mock('@now')

    newData.id = loanListData.data.length + 1
    loanListData.data.unshift(newData)

    loanListData.page.total = loanListData.data.length
    loanListData.page.current = 1

    global[dataKey] = loanListData

    res.json({ success: true, data: loanListData.data, page: loanListData.page })
  },

  'DELETE /api/loanTypes' (req, res) {
    const deleteItem = JSON.parse(req.body)
    const usersListData=loanListData

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

  'PUT /api/loanTypes' (req, res) {
    const editItem = JSON.parse(req.body)

    const usersListData=loanListData

    editItem.entryTime = Mock.mock('@now')

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

}
