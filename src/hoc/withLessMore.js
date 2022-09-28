const { useCallback } = require("react");
const { useState } = require("react");

const withLessMore = (Component) => {
  return (props) => {
    const [show, setShow] = useState(false);
    const toggleShow = useCallback(() => {
      setShow((prev) => !prev);
    }, []);
    return <Component {...props} {...{ show, toggleShow }} />;
  };
};

export default withLessMore;
