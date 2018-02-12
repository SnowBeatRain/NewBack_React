import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

// 导入路由对应组件
import Login from '../login/containers/App'
import Home from '../home/containers/App'
import Strategy from '../strategy/containers/App'
import Accountnumber from '../accountnumber/containers/App'
import Activity from '../activity/containers/App'
import Case from '../case/containers/App'
import Company from '../company/containers/App'
import Constructionsite from '../constructionsite/containers/App'
import People from '../people/containers/App'
import Transaction from '../transaction/containers/App'
import Message from '../message/containers/App'

export default class Routes extends Component {
  render() {
    return (
      <div style={{width: 1200, margin: 'auto'}}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/strategy/:id?" component={Strategy}/>
          <Route path="/accountnumber" component={Accountnumber}/>
          <Route path="/activity" component={Activity}/>
          <Route path="/case" component={Case}/>
          <Route path="/company" component={Company}/>
          <Route path="/company/detail/:id?" component={Company}/>
          <Route path="/constructionsite" component={Constructionsite}/>
          <Route path="/people" component={People}/>
          <Route path="/strategy" component={Strategy}/>
          <Route path="/transaction" component={Transaction}/>
          <Route path="/message" component={Message}/>
          <Route component={Home}/> {/* 默认路由*/}
        </Switch>
      </div>
    )
  }
}
