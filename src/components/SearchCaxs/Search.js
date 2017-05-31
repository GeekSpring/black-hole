import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './Search.less'
import { Input, Select, Button, Icon } from 'antd'

class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    selectTyp:'all'
  }
  handleSearch = (e) => {
    e.preventDefault();
    let keyword=this.state.selectTyp
    const data={}
    if(keyword==='all'){
      let selectOpts=this.props.selectOptions
      for(let i=0;i<selectOpts.length;i++){
        if(selectOpts[i].titVal){
          let keyword=selectOpts[i].titVal;
          data[keyword]=ReactDOM.findDOMNode(this.refs.searchInput).value
        }
      }
    }else{
      data[keyword]=ReactDOM.findDOMNode(this.refs.searchInput).value
      console.log(data)
    }
    if (this.props.select) {
      data.field = this.state.selectValue
    }
    if (this.props.onSearch) this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    })
  }
  handeleSelectChange = (e,value) => {
    console.log(e)
    this.setState({
      ...this.state,
      selectValue: value,
      selectTyp:e
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this.setState({
      clearVisible: false,
    })
    this.handleSearch()
  }
  render () {
    const { size, select, selectOptions, selectProps, style, keyword } = this.props
    const { clearVisible } = this.state
    return (
      <Input.Group compact size={size} className={styles.search} style={style}>
        {select && <Select style={{width:'25%'}} ref="searchSelect" onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>}
        <Input style={{height:'inherit'}} ref="searchInput" size={size} onChange={this.handleInputChange} onPressEnter={this.handleSearch} defaultValue={keyword} />
        <Button size={size} type="primary" onClick={this.handleSearch}>搜索</Button>
        {clearVisible && <Icon type="cross" onClick={this.handleClearInput} />}
      </Input.Group>
    )
  }
}


Search.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearch: PropTypes.func,
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
}

export default Search
