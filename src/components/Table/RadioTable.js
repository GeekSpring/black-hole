import React, { PropTypes } from 'react'
import { Table, Button } from 'antd';

function RadioTable ({ loading, dataSource, pagination, columns, onPageChange,onChangeRadio, onDeleteItem, onEditItem, isMotion, location,selectedRows }) {

  const rowSelection = {
    type:'radio',
    onChange: (selectedRowKeys, selectedRow) => {
      onChangeRadio(selectedRow)
      selectedRows=selectedRow
    },

    onSelect: (record, selected, selectedRows) => {
       console.log(selected)
       console.log(selectedRows)
       console.log(record)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
     // console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

    return (
      <div>
        <div style={{marginBottom: 16}}>
         <Table
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            loading={loading}
            onChange={onPageChange}
            pagination={pagination}
          />
        </div>
      </div>
    );
}

RadioTable.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  selectedRows: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default RadioTable;
