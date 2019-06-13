import React , {Component} from 'react';
import { Tabs } from 'antd-mobile';
import PhoneRegister from './coms/phoneRegister'
import EmailRegister from './coms/emailRegister'
import './register.less';
import {FormattedMessage} from 'react-intl';


const tabs = [
  { title: <span><FormattedMessage id="phoneRegister" defaultMessage="手机注册"/></span> },
  { title: <span><FormattedMessage id="emailRegister" defaultMessage="邮箱注册"/></span> },
];
class Register extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return (
      <div className = "flex-container">
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
        <div style={{paddingTop:'4vh', height:'90vh', backgroundColor: '#fff' }}>
          <PhoneRegister changeLang={this.props.changeLang}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', height: '90vh', backgroundColor: '#fff' }}>
          <EmailRegister/>
        </div>
      </Tabs>
      </div>
    )
  }
}

export default Register;
