import React from "react";

import "./Card.style.scss";


const Card = (props) => {
  const { title, content,createdOn, action1, action2,id } = props;

 

  return (
    <div className="card-wrapper">
          <div className="card purple lighten-1">
            <div className="card-content black-text">
              <span className="card-title">{title}</span>
              {content}
            </div>
            <div className="card-action card-footer">
              <p>{createdOn}</p>
              {
                action1 !== undefined ?
                  // <a className="waves-effect waves-teal btn-flat">Button</a>
                  <button href="#" className="cyan lighten-2 waves-effect btn-flat" onClick={()=>action1.action(id)} >{action1.label}</button>
                  : ""
              }
              {
                action2 !==undefined ?
                  // <a className="waves-effect waves-teal btn-flat">Button</a>
                  <button href="#" className="cyan lighten-2 waves-effect btn-flat" onClick={()=> action2.action(id)} >{action2.label}</button> 
                  : ""
              }
            </div>
          </div>
        </div>
  );
};

export default Card;
