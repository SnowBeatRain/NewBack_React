import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import '../sass/Nav.scss'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      pathname: '/home',
            showPlant: false,
        showActivity: false,
            showCase: false,
            showDeal: false
        }
  }
  componentWillMount() {
    let current_path = window.location.pathname

      current_path = current_path === '/' ? '/home' : current_path
      switch (current_path) {
          case '/constructionsite':
            return this.setState({showPlant: true})
          case '/activity':
            return this.setState({showActivity: true})
          case '/case':
            return this.setState({showCase: true})
          case '/transaction':
            return this.setState({showDeal: true})
      }

      this.setState({pathname: current_path})
  }

  //切换主导航与路由
    toPlant = place => {
        let NavPath = {
          0: '/constructionsite',
          1: '/activity',
          2: '/case',
          3: '/transaction'
        }
        let arr = ['showPlant', 'showActivity', 'showCase', 'showDeal']
        let Mpath = arr[place]

        this.props.history.push(NavPath[place])
        this.setState({pathname: NavPath[place]})
        if (this.state[Mpath]) {
          this.setState({[Mpath]: false})
        } else {
            this.setState({[Mpath]: true})
        }
    }

  //切换二级导航与路由 js跳转路由
  //   handleSub = (place, e) => {
  //     let subPath = {
  //       0: '/constructionsite',
  //       1: '/constructionsite/add',
  //       2: '/activity',
  //       3: '/activity/add',
  //       4: '/case',
  //       5: '/case/add',
  //       6: '/transaction',
  //       7: '/transaction/add'
  //     }

      //this.props.history.push(subPath[place])
    //   this.setState({pathname: subPath[place]})
    // }

  render() {
      let current_path = window.location.pathname

      current_path = current_path === '/' ? '/home' : current_path
      let path = current_path || this.state.pathname
      let showPlant = this.state.showPlant
      let showActivity = this.state.showActivity
      let showCase = this.state.showCase
      let showDeal = this.state.showDeal

return (
      <div className="de-nav" >
        <ul className="nav_container">
          <li className="nav-item">
            <Link to="/home">
              <div className="title">
              <i className={path === '/home' ? ' line active' : 'line'}></i>
              <i className="iconfont icon-homecopy tit-icon" style={{color: path === '/home' ? '#FF4200' : ''}}></i>
              <span style={{color: path === '/home' ? '#FF4200' : ''}}>首页</span>
            </div>
            </Link>
          </li>
          <li className="nav-item">
              <div className="title" onClick={this.toPlant.bind(this, '0')}>
              <i className={path.indexOf('/constructionsite') !== -1 ? ' line active' : 'line'}></i>
              <i className="iconfont icon-gondicopy tit-icon plant" style={{color: path.indexOf('/constructionsite') !== -1 ? '#FF4200' : ''}}></i>
              <span>工地管理</span>
              <i className={`iconfont icon-sanjiaoyoubiao arr ${showPlant ? 'active' : ''}`}></i>
            </div>
              {showPlant && <ul className="subnav">
                  <Link to="/constructionsite"><li className={path === '/constructionsite' ? 'sub-item active' : 'sub-item'}>工地管理</li></Link>
                  <Link to="/constructionsite/add"><li className={path === '/constructionsite/add' ? 'sub-item active' : 'sub-item'}>创建工地</li></Link>
            </ul>}
          </li>
          <li className="nav-item">
            <div className="title" onClick={this.toPlant.bind(this, 1)}>
                <i className={path.indexOf('/activity') !== -1 ? ' line active' : 'line'}></i>
                <i className="iconfont icon-huodongcopy tit-icon" style={{color: path.indexOf('/activity') !== -1 ? '#FF4200' : ''}}></i>
                <span>活动管理</span>
                <i className={`iconfont icon-sanjiaoyoubiao arr ${showActivity ? 'active' : ''}`}></i>
            </div>
              { showActivity && <ul className="subnav">
                  <Link to="/activity"><li className={path === '/activity' ? 'sub-item active' : 'sub-item'}>活动列表</li></Link>
                  <Link to="/activity/add"><li className={path === '/activity/add' ? 'sub-item active' : 'sub-item'}>创建活动</li></Link>
            </ul>}
          </li>
          <li className="nav-item">
            <div className="title" onClick={this.toPlant.bind(this, 2)}>
                <i className={path.indexOf('/case') !== -1 ? ' line active' : 'line'}></i>
                <i className="iconfont icon-casecopy tit-icon" style={{color: path.indexOf('/case') !== -1 ? '#FF4200' : ''}}></i>
                <span>案例管理</span>
                <i className={`iconfont icon-sanjiaoyoubiao arr ${showCase ? 'active' : ''}`}></i>
            </div>
              {showCase && <ul className="subnav">
                  <Link to ="/case"><li className={path === '/case' ? 'sub-item active' : 'sub-item'} >案例列表</li></Link>
                  <Link to ="/case/add"><li className={path === '/case/add' ? 'sub-item active' : 'sub-item'} >添加案例</li></Link>
            </ul>}
          </li>
          <li className="nav-item">
            <Link to="/strategy">
              <div className="title">
                <i className={path === '/strategy' ? ' line active' : 'line'}></i>
                <i className="iconfont icon-youwangonglvecopy tit-icon" style={{color: path === '/strategy' ? '#FF4200' : ''}}></i>
                <span style={{color: path === '/strategy' ? '#FF4200' : ''}}>装修攻略</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/company">
              <div className="title">
                <i className={path.indexOf('/company') !== -1 ? ' line active' : 'line'}></i>
                <i className="iconfont icon-gongsicopy tit-icon" style={{color: path.indexOf('/company') !== -1 ? '#FF4200' : ''}}></i>
                <span style={{color: path.indexOf('/company') !== -1 ? '#FF4200' : ''}}>公司管理</span>
              </div>
            </Link>
          </li>
          <li className="nav-item deal">
            <div className="title" onClick={this.toPlant.bind(this, 3)}>
              <i className={path.indexOf('/transaction') !== -1 ? ' line active' : 'line'}></i>
              <i className="iconfont icon-jiaoyicopy tit-icon" style={{color: path.indexOf('/transaction') !== -1 ? '#FF4200' : ''}}></i>
              <span>交易中心</span>
              <i className={`iconfont icon-sanjiaoyoubiao arr ${showDeal ? 'active' : ''}`}></i>
            </div>
              {showDeal && < ul className="subnav">
                  <Link to ="/transaction"><li className={path === '/transaction' ? 'sub-item active' : 'sub-item'}>交易概况</li></Link>
                  <Link to ="/transaction/member"><li className={path === '/transaction/member' ? 'sub-item active' : 'sub-item'}>会员方案</li></Link>
            </ul>}
          </li>
          <li className="nav-item">
            <Link to="/people">
                <div className="title">
                    <i className={path === '/people' ? ' line active' : 'line'}></i>
                    <i className="iconfont icon-xiaoshoucopy tit-icon" style={{color: path === '/people' ? '#FF4200' : ''}}></i>
                <span style={{color: path === '/people' ? '#FF4200' : ''}}>销售人员</span></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/accountnumber">
                <div className="title">
                    <i className={path === '/accountnumber' ? ' line active' : 'line'}></i>
                    <i className="iconfont icon-zhanghaoguanlicopy tit-icon" style={{color: path === '/accountnumber' ? '#FF4200' : ''}}></i>
                    <span style={{color: path === '/accountnumber' ? '#FF4200' : ''}}>账号管理</span>
                </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Nav)
