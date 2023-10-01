// import { useState } from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";

function CheckoutSwitch({ isChecked, setIsChecked }) {
  const handleChange = (checked) => {
    setIsChecked(checked);
    // You can perform actions when the switch is toggled here
  };

  return (
    <div className="checkout-switch">
      <label>
        {/* <span>Checkout</span> */}
        <Switch
          onChange={handleChange}
          checked={isChecked}
          onColor="#2196F3"
          offColor="#ccc"
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </label>
      <p>{isChecked ? "Colored" : "Off"}</p>
    </div>
  );
}
CheckoutSwitch.propTypes = {
  isChecked: PropTypes.bool,
  setIsChecked: PropTypes.func,
};

export default CheckoutSwitch;
