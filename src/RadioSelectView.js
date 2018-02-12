import React from "react";
import PropTypes from "prop-types";


const styles = {
  visuallyHidden: {
    position: "absolute",
    oveflow: "hidden",
    clip: "rect(0 0 0 0)",
    height: 1,
    width: 1,
    margin: -1,
    padding: 0,
    border: 0
  },
  radioSelect: {
    position: "relative",
    display: "inline-block",
    boxSizing: "border-box",
    width: "100%"
  },
  value: {
    width: "100%",
  },
  optionList: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    top: "100%",
    left: 0
  }
};


const RadioSelectView = ({
                       name,
                       options,
                       required,
                       className,
                       collapsed,
                       selectedOption,
                       highlightedOption,
                       focused,
                       inputRef,
                       handleMouseDownValue,
                       handleClickValue,
                       handleBlurInput,
                       handleChangeInput,
                       handleFocusInput,
                       handleKeyDownInput,
                       handleMouseDownLabel,
                       handleClickLabel,
                       handleMouseEnterLabel,
                       otherProps
}) => {
  return (
    <div {...otherProps}
         style={styles.radioSelect}
         className={`radio-select ${focused ? 'focused ' : ' '}${className ? className : ''}`}
    >
      <div className="value"
           onMouseDown={e => handleMouseDownValue(e)}
           onClick={e => handleClickValue(e)}
           style={styles.value}
      >
        {options[selectedOption].component}
      </div>
      <div className={`option-list ${collapsed ? 'collapsed' : ''}`}
           style={collapsed ? styles.visuallyHidden : styles.optionList}>
        {options.map((option, key) => (
          <div key={key}>
            <span id={name + "Label" + key} style={styles.visuallyHidden}>{option.ariaLabel}</span>
            <label htmlFor={name + key}
                   onMouseDown={e => handleMouseDownLabel(e, key)}
                   onClick={e => handleClickLabel(e, key)}
                   onMouseEnter={e => handleMouseEnterLabel(e, key)}
                   {...option.labelAttrs}>
              <div className={`option${highlightedOption === key ? ' highlight' : ''}${selectedOption === key ? ' selected' : ''}`}>
                {option.component}
              </div>
            </label>
            <input
              aria-labelledby={name + "Label" + key}
              style={styles.visuallyHidden}
              ref={radio => inputRef(radio, key)}
              type="radio"
              required={required}
              checked={selectedOption === key}
              name={name}
              id={name + key}
              value={option.value}
              onBlur={e => handleBlurInput(e, key)}
              onChange={e => handleChangeInput(e, key)}
              onFocus={e => handleFocusInput(e, key)}
              onKeyDown={e => handleKeyDownInput(e)}
              {...option.inputAttrs}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

RadioSelectView.propTypes = {
  // state to props
  collapsed: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  selectedOption: PropTypes.number.isRequired,
  highlightedOption: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
      ariaLabel: PropTypes.string.isRequired,
      inputAttrs: PropTypes.object,
      labelAttrs: PropTypes.object,
    })
  ).isRequired,
  required: PropTypes.bool.isRequired,
  inputRef: PropTypes.func.isRequired,
  handleMouseDownValue: PropTypes.func.isRequired,
  handleClickValue: PropTypes.func.isRequired,
  handleBlurInput: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleFocusInput: PropTypes.func.isRequired,
  handleKeyDownInput: PropTypes.func.isRequired,
  handleMouseDownLabel: PropTypes.func.isRequired,
  handleClickLabel: PropTypes.func.isRequired,
  handleMouseEnterLabel: PropTypes.func.isRequired,
  otherProps: PropTypes.object
};

RadioSelectView.defaultProps = {
  required: false
};

export default RadioSelectView;