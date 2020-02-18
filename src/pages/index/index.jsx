import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Icon } from '@tarojs/components'
import './index.scss'
import { add, del } from '../../actions'
import { connect } from '@tarojs/redux'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  handleBlur(e) {
    let { newTodo } = this.state
    const todo = e.detail.value
    if(!todo || todo === newTodo) return
    this.setState({
      newTodo: todo
    })
  }

  handleAdd() {
    let { newTodo } = this.state
    let { add } = this.props
    if(!newTodo) return
    add(newTodo)
    this.setState({
      newTodo: ''
    })
  }

  handleDelete(id) {
    let { del } = this.props
    del(id)
  }

  render () {
    let { newTodo } = this.state
    let { todos } = this.props
    return (
      <View className='index'>
        <View className='index-tip gray'>我的待办事项：</View>
        <View style={{padding: '0.3rem 1rem 0.5rem 1rem'}}>
          <Input
            style={{display: 'inline-block', width: '70%'}}
            className='index-input' 
            value={newTodo}
            placeholder='请输入待办事项'
            onBlur={this.handleBlur.bind(this)} 
          />
          <Button 
            style={{display: 'inline-block', width: '20%', backgroundColor: '#007fff', color: 'white'}}
            className='index-button' 
            onClick={this.handleAdd.bind(this)}
          >
              添加
          </Button>
        </View>
        <View>
          {
            todos.map((item, index) => {
              return (<View key={index} className='index-tip'>
                {`【${item.id}】`} { item.text }
                <Icon
                  className='index-item-icon' 
                  type='cancel' 
                  onClick={this.handleDelete.bind(this, item.id)}
                />
              </View>)
            })
          }
        </View>
      </View>
    )
  }
}

export default connect (({ todos }) => ({
  todos: todos.todos
}), (dispatch) => ({
  add (data) {
    dispatch(add(data))
  },
  del (id) {
    dispatch(del(id))
  }
}))(Index)
