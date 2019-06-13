import React ,{Component} from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';



class InterPhoneInput extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  // 传递给父组件
  handleBlur = (status, value, countryData, number, id) =>{
    // console.log(status, value, countryData, number, id,'sss')
    this.setState({value ,countryData})
    let formatNumber = `+${countryData.dialCode +value}`
    let countryCode = countryData.iso2
    this.props.getIntelInput(formatNumber,countryCode)
  }
  render() {
    return (
      <IntlTelInput
      autoPlaceholder = {false}
      preferredCountries={['cn','us','jp','kr']}
      // onPhoneNumberChange={this.handleClick}
      onPhoneNumberBlur={this.handleBlur}
    />
    )
  }
}

export default InterPhoneInput;