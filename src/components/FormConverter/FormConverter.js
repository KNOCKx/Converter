import React    from "react";
import template from "./FormConverter.jsx";

class FormConverter extends React.Component {

  render() {
    return template.call(this);
  }
}

export default FormConverter;
