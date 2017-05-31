import React, { PropTypes } from 'react'
import { Table } from 'antd';

function CostsSetList({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location }){
  const columns = [{
    title: 'id',
    dataIndex: 'id',
  },{
    title: '费用代码',
    dataIndex: 'name',
  }, {
    title: '费用描述',
    dataIndex: 'age',
  }, {
    title: '费用类型',
    dataIndex: 'address',
  }, {
    title: '状态',
    dataIndex: 'address2',
  } ];
  return (<div>
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={record => record.id}
      loading={loading}
      onChange={onPageChange}
      pagination={pagination}
    />
  </div>)
}
CostsSetList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address2: `London, Park Lane no. ${i}`
  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}
export  default App;
