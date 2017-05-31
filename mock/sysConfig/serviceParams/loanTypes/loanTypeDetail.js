const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('loanTyp', Mock.mock({
  data:
    {
      typSeq: /^1[246]\d{6}$/,
      typCde: /^CA[246]\d{6}$/,
      typDesc () {
        return Mock.Random.csentence(3, 5)
      },
      typDetail(){
        return Mock.Random.csentence(3, 5)
      },
      'typGrp|1': [
        "01",
        "02",
        "03",
      ],
      "typForm|1": [
        "01",
        "02",
        "03",
      ],
      typVer:1,
      startDt(){
        return Mock.Random.date('yyyy-MM-dd')
      },
      endDt(){
        return Mock.Random.date('yyyy-MM-dd');
      },
      "typSts|1": [
        "A",
        "I",
        "W",
      ],
      staffInd:'N',
      sbsyInd:'N',
      extInd:'Y',
      settInd:'N',
      lateFeeInd:'N',
      "tnrOpt": [
        "D",
        "3",
        "6",
        "12",
        "36",
        "60",
      ],
      "typFreq|1": [
        "2W",
        "1M",
        "6M",
      ],
      minAmt:10000,
      maxAmt:1000000,
      fstPct:20,
      coltTyp:100,
      extNum:1,
      "docChannel|1": [
        "DF00001",
        "SYS001",
        "SYS002",
      ],
      "gutrTyp|1": [
        "10",
        "20",
        "30",
        "40",
      ],
      "typWf|1": [
        "XFDK_000",
        "CARE_000",
        "AUTO_000",
      ],
      "typCompl|1": [
        "ConsumeCreditScoreRulesSet",
     ],
      "rateRule|1": [
        "01",
      ],
      "typAuth|1": [
        "SQ0001",
      ],
      "rateMode|1": [
        "FX",
        "VR",
      ],
      "repcOpt|1": [
        "NYF",
      ],
      "grdMtd|1": [
        "GRDM001",
      ],
      "odGraceTyp|1": [
        "E",
        "P",
      ],
      odGrace:10,





    },


}))

let loanTyp = global[dataKey]

module.exports = {

  'GET /api/loanTypeDetail' (req, res) {
    res.json({ success: true, loanTyp })
  },

  'POST /api/loanTypes' (req, res) {
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
