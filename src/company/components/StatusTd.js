import React, {Component} from 'react'

export default class StatusTd extends Component {
    constructor() {
        super()
        this.state = {auditstatus: 0}
    }
    _changeResult = (id, status, e) => {
        let {_companyAudit} = this.props

        _companyAudit(id, status, e)
        this.setState({auditstatus: status})
    }

    render() {
        let {id, status} = this.props
        let {auditstatus} = this.state

        auditstatus = auditstatus === 0 ? status : auditstatus

return (
            <div className="td">
                <span className={auditstatus === 3 ? 'active' : ''} onClick={this._changeResult.bind(this, id, 3)}>通过</span>
                <span className={auditstatus === 1 ? 'active' : ''} onClick={this._changeResult.bind(this, id, 1)}>不通过</span>
                <span className={auditstatus === 4 ? 'active' : ''} onClick={this._changeResult.bind(this, id, 4)}>暂停</span>
            </div>
        )
    }
}
