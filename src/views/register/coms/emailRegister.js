import React ,{Component} from 'react';
import { InputItem ,Button ,Toast,Flex, WhiteSpace } from 'antd-mobile';
import SendCode from '../../../components/sendCode';
// import {injectIntl,FormattedMessage} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import initCaptcha from '../../../components/initCaptcha';
import {register} from '@/api/api';
import './phoneRegister.less'

class EmailRegister extends Component {
  constructor(props){
    super(props)
    this.state={
      promotionCode:'this is a code ',
      hasError:false,
      disabledReg:false
    }
  }
  handleRegister = ()=>{
    this.setState({disabledReg:true})
    setTimeout(()=>{
    this.setState({disabledReg:false})
    },1000)
    initCaptcha().then(
      async (data)=>{
        let params = {
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
        if(res.data.token ){
          Toast.info('成功')
          setTimeout(()=>{   
            window.open('https://www.baidu.com/')
           },1000)
        }
        } catch (error) {
       
        Toast.info(error.response.data.message)
        }
        
      }
    ).catch()
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
    // const {intl} = this.props;
    return (
      <div className="phone">
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
        <InputItem
            onBlur = {(v)=>this.setState({uri: `${'mailto:'+v}`})}
            // placeholder = {intl.formatMessage({id:'hello'})}
          >
            <FormattedMessage id="email" defaultMessage="邮箱"/>
          </InputItem>
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
          <SendCode  typeObj={{uri:this.state.uri , type:'register'}}/>
        </div>
      </Flex>
      <WhiteSpace size="lg" />
      <Flex className="inline font-style">
        <div>
        <InputItem
            value={this.state.promotionCode}
            readOnly
            type="phone"
            placeholder=""
          >
          <FormattedMessage id="inviteCode" defaultMessage="邀请码"/>            
        </InputItem>
        </div>
      </Flex>
      <WhiteSpace size="lg" />
      <Button type="primary" 
      onClick={()=>{this.handleRegister()}} 
      disabled={this.state.disabledReg}      
      >

      <FormattedMessage id="register" defaultMessage="注册"/>            
      </Button>
  </div>
    )
  }
}

export default EmailRegister;
