import React, { Component } from 'react'
import { Button,Toast} from 'antd-mobile'
import initCaptcha from './initCaptcha';
import {sendVcode} from '@/api/api';
import {FormattedMessage} from 'react-intl';


// 获取验证码
 class SendCode extends Component {
  constructor(props){
    super(props)
    this.state ={
      disabled:false,
      loading:false,
      text: <FormattedMessage id="verification" defaultMessage="验证码"/>,
      num:60,
      timer:null
    }
  }
   handleClick = async ()=>{
    // this.countDown()
    this.setState({disabled:true})
    setTimeout(()=>{
    this.setState({disabled:false})
    },1000)
   let info = this.props.typeObj ||{}
   await this.geetAndSend(info)
  }
  countDown = () => {
    const timer = setInterval(() => {
      if (this.state.num !== 1) {
        let next = this.state.num - 1
        this.setState({num: next, text: `${next} s` ,disabled:true})
      } else {
        this.setState({num: 60, text: <FormattedMessage id="resend" defaultMessage="重新发送"/>, disabled: false})
        clearInterval(timer)
      }
    }, 1000)
    this.setState({timer: timer})
  }
  
  geetAndSend(info){
    initCaptcha().then(async(data )=>{
      let params = {
        uri: info.uri.trim(),
        type: info.type,
        challenge: data.geetest_challenge,
        seccode: data.geetest_seccode,
        validate: data.geetest_validate
      }
      try {
        await sendVcode(params)
        this.countDown()
      } catch (error) {
        Toast.info(error.response.data.message)

      }
   
    }

    ).catch(
      (res)=>{
        console.log(res ,'sdasdasdasd');
      }
    )
  }
  // 取消定时器
  componentWillUnmount() {

  }

  // 渲染
  render() {
    const { text, loading, disabled } = this.state
    return (
      <Button
        type = 'ghost'
        size = 'small'
        style={{textAlign: 'center'}}
        disabled={disabled}
        onClick={this.handleClick}
        loading={loading}>
        {text}
      </Button>
    );
  }
}

export default SendCode