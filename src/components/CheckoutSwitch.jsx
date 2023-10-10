import Switch from "react-switch";
import PropTypes from "prop-types";

function CheckoutSwitch({ isChecked = false, setIsChecked, saveLocalStorage }) {
  //! Check for the card background colors
  const handleChange = (checked) => {
    setIsChecked(checked);
    saveLocalStorage(checked);
  };

  return (
    <div className="checkout-switch">
      <label>
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
  saveLocalStorage: PropTypes.func,
};

export default CheckoutSwitch;
