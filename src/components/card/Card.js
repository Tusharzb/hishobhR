import React from "react";

import "./Card.style.scss";
import Summary from "../TransactionSummary/Summary";
import Collapsible from "../Collapsible/Collapsible";


const Card = (props) => {
  const { title, content, createdOn, action1, action2, id, isHistory } = props;
  return (
    <div className="card-wrapper">
      <div className={`card ${isHistory ? 'grey lighten-2' : 'purple lighten-1'}`} >
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          {content}
        </div>
        <div className="card-body">
          <Collapsible className="card-summary" data={[{ label: "Summary", content: <Summary trackerId={id || ""} /> }]} />
        </div>
        <div className="card-action card-footer">
          <p>{createdOn}</p>
          {
            action1 !== undefined ?
              // <a className="waves-effect waves-teal btn-flat">Button</a>
              <button href="#" className="cyan lighten-2 waves-effect btn-flat" onClick={() => action1.action(id)} >{action1.label}</button>
              : ""
          }
          {
            action2 !== undefined ?
              // <a className="waves-effect waves-teal btn-flat">Button</a>
              <button href="#" className="cyan lighten-2 waves-effect btn-flat" onClick={() => action2.action(id)} >{action2.label}</button>
              : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
