import React ,{Component} from 'react';
import logo from '@/assets/imgs/logo.png'
import { Button, WhiteSpace ,WingBlank} from 'antd-mobile';


class Download extends Component {
  render() {
    return (
      <div style ={{backgroundColor:'#fff' , paddingTop:'10vh' ,height:'100vh'}}>
      <WingBlank size="md" style={{textAlign:'center'}}>
        <img src={logo} style={{ width:'180px' ,height:'180px'}} alt="Logo" />
        <p style={{color:'#212121', fontSize:'1.25rem'}}>YouBank</p>
      </WingBlank>
      <WingBlank size="md" style={{textAlign:'center' ,padding:'20px 0px'}}>
        <span style={{fontSize:'1rem'}}>下载App</span>
      </WingBlank>
      <WingBlank size="md">
        <Button type="primary">Android下载</Button><WhiteSpace/>
        <Button type="primary">iPhone下载</Button>
      </WingBlank>
      </div>
  
    )
  }
}

export default Download;
