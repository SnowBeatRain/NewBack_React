import React, {Component} from 'react'
import '../sass/Qrcode.scss'
import QRCode from 'qrcode.react'

export default class Qrcode extends Component {
    constructor() {
        super()
    }

    // 字符转编码
    utf16to8 = str => {
        let out, i, len, c

        out = ''
        len = str.length
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i)
            if (c >= 0x0001 && c <= 0x007F) {
                out += str.charAt(i)
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | c >> 12 & 0x0F)
                out += String.fromCharCode(0x80 | c >> 6 & 0x3F)
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F)
            } else {
                out += String.fromCharCode(0xC0 | c >> 6 & 0x1F)
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F)
            }
        }

return out
    }

    render() {
        let {closeQrcode, sellerID} = this.props

        //判断是否为中文
        let reg = /^[\u0391-\uFFE5]+$/

        sellerID = sellerID !== '' && !reg.test(sellerID) ? sellerID : this.utf16to8(sellerID)

 return (
            <div className="qr_container">
                <div className="qr_code">
                    <div className="tit">
                        <span>个人二维码</span>
                        <i className="iconfont icon-Page fr" onClick={closeQrcode.bind(this)}></i>
                    </div>
                    <QRCode
                        value={sellerID}
                        size={300}
                    />
                </div>
            </div>
        )
    }
}
