import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  // history.push will allow user to click outside of modal to close the it
  // e.stopPropogation will allow user to click anywhere on the modal window without closing it as
  // it makes that div handle the event without letting it bubble up to its parent div
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
