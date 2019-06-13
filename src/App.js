import React , {Component} from 'react';
import { BrowserRouter as Router, Route ,Switch } from "react-router-dom";
import Register from './views/register/register';
import Download from './views/register/download';
import en_US from './locale/en_US';
import zh_CN from './locale/zh_CN';
import ko_KR from './locale/ko_KR';
import ja_JP from './locale/ja_JP';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { addLocaleData, IntlProvider } from 'react-intl'; /* react-intl imports */

addLocaleData([...en, ...zh]);

class  App extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  changeLang = (v)=>{
    const langMap = {
      zh_CN,
      en_US,
      ko_KR,
      ja_JP
    }
    
    this.setState({lang:langMap[v]})
  }

  render(){
    return (
    <IntlProvider locale='zh' messages={this.state.lang || zh_CN  } >
      <Router >
      <Switch>
        <Route exact path = '/' render={()=> <Register changeLang={this.changeLang} />}></Route>
        <Route exact path = '/download' component={Download}></Route>
      </Switch>
      </Router>
      </IntlProvider>
    );
  }

}

export default App;
