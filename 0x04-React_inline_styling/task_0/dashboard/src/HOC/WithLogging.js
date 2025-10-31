import React from "react";
import PropTypes from "prop-types";

class WithLogging extends React.Component {
  constructor(props) {
    super(props);
    const { compToWrap } = this.props;

    this.compToWrap = compToWrap;
    this.name =
      this.compToWrap.displayName ||
      this.compToWrap.name ||
      "Component";

    // Set displayName dynamically
    this.constructor.displayName = `WithLogging(${this.name})`;
  }

  componentDidMount() {
    console.log(`Component ${this.name} is mounted`);
  }

  componentWillUnmount() {
    console.log(`Component ${this.name} is going to unmount`);
  }

  render() {
    const { compToWrap, ...rest } = this.props;
    return <this.compToWrap {...rest} />;
  }
}

WithLogging.propTypes = {
  compToWrap: PropTypes.elementType.isRequired,
};

export default WithLogging;
