import React ,{Component} from 'react';
import { Flex, WhiteSpace, Toast } from 'antd-mobile';
import { InputItem ,Button} from 'antd-mobile';
import SendCode from '../../../components/sendCode';
import InterPhoneInput from '../../../components/intelInput';
import initCaptcha from '../../../components/initCaptcha';
import {register} from '@/api/api';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios'
import './phoneRegister.less'


class PhoneRegister extends Component {
  constructor(props){
    super(props)
    this.state={
      promotionCode:'this is a code ',
      hasError:false,
      disabledReg:false
    }
  }

  getIntelInput=(formatPhone,countryCode)=>{

      this.setState({
        phoneObj:{
          uri:`number:${formatPhone.trim()}`,
          type:'register'
        },
        countryCode:countryCode,
        uri:`number:${formatPhone}`,
        type:'register'
      })
  }
  handleRegister = ()=>{
    this.setState({disabledReg:true})
    setTimeout(()=>{
    this.setState({disabledReg:false})
    },1000)
    initCaptcha().then(
      async (data)=>{
        let params = {
          nationalityCode:this.state.countryCode.toUpperCase(),  //lixing
          uri:this.state.uri.trim(),
          password :this.state.password,
          promotionCode:this.state.promotionCode,
          verificationCode:this.state.verificationCode,
          challenge: data.geetest_challenge,
          seccode: data.geetest_seccode,
          validate: data.geetest_validate
        }
        try {
        const res = await register(params)
        //TODO 跳转
        if(res.data.token){
          Toast.info('成功')
          setTimeout(()=>{   
            window.open('https://wwww.baidu.com/')
           },1000)
        }
        } catch (error) {
        Toast.info(error.response.data.message)
        }
        
      }
    ).catch()
  }
  handleChange =(event)=>{
    // console.log(event.target.value ,'sss');
    this.props.changeLang(event.target.value)
    axios.defaults.headers = {
      Language:event.target.value
    }    
  }
  onBlur = (value)=>{
    let r = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/
    let re = new RegExp(r)
    // console.log(value);
    if (!re.test(value)) {
      this.setState({
        hasError: true,
      });
      Toast.info('请输入8～16位，且包含数字字母字符任意两种');
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({password:value})
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请输入8～16位，且包含数字字母字符任意两种');
    }
  }
  render() {
    return (
      <div className="phone">
      <WhiteSpace size="lg" />
      <Flex className="inline font-style" style={{overflow:'visible'}}>
        <div style={{flex:1,align:'end' ,paddingLeft:'20px'}}>
          <FormattedMessage id="phone"  defaultMessage="手机号"/>
        </div>
        <div style={{flex:3}}>
          <InterPhoneInput getIntelInput ={this.getIntelInput}/>
        </div>
      </Flex>
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
      <InputItem
            type="password"
            placeholder=""
            error={this.state.hasError}
            onBlur={this.onBlur}
            onErrorClick={this.onErrorClick}

          >
            <FormattedMessage id="password" defaultMessage="密码"/>
          </InputItem>
      </Flex>
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
        <div style={{flex :"4"}}>
        <InputItem
            type="num"
            maxLength="6"
            onBlur = {(v)=>this.setState({verificationCode:v})}
            placeholder=""
          >
            <FormattedMessage id="verification" defaultMessage="验证码"/>
          </InputItem>
        </div>
        <div  style={{flex :"1"}}>
          <SendCode  typeObj={this.state.phoneObj}/>
        </div>
      </Flex>
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
        <div>
        <InputItem
            value={this.state.promotionCode}
            readOnly
            placeholder=""
          >
            <FormattedMessage id="inviteCode" defaultMessage="邀请码"/>            
        </InputItem>
        </div>
      </Flex>
      <WhiteSpace size="lg" />
      <Button type="primary" 
      disabled={this.state.disabledReg}
      onClick={()=>{this.handleRegister()}
      } >
      <FormattedMessage id="register" defaultMessage="注册"/>            
      </Button>
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
        <Flex.Item >
        <select value={this.state.value} onChange={this.handleChange}>
              <option value="zh_CN">中文</option>
              <option value="en_US">English</option>
              <option value="ko_KR">언어</option>
              <option value="ja_JP">日本語</option>
        </select> 
        </Flex.Item>
        <Flex.Item align='right'  >
          <a href="https://www.baidu.com/" style={{color:'#DC000C'}}>
          <FormattedMessage id="downLoad" defaultMessage="立即下载"/>
          </a>
        </Flex.Item>
      </Flex>
  </div>
    )
  }
}

export default injectIntl(PhoneRegister);
