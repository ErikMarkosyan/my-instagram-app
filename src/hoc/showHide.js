const { useCallback } = require("react");
const { useState } = require("react");

const showHide = (Component) => {
  return (props) => {
    const [show, setShow] = useState(false);
    const toggleShow = useCallback(() => {
      setShow((prev) => !prev);
    }, []);
    return <Component {...props} {...{ show, toggleShow }} />;
  };
};

export default showHide;
