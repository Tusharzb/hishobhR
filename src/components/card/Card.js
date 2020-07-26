import React from "react";

import "./Card.style.scss";

const Card = (props) => {
  const { title, action1, action2 } = props;
  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue lighten-1">
            <div className="card-content white-text">
              <span className="card-title">Card Title</span>
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div className="card-action right-align">
                <a href="#" className="red-text ">
                  This is a link
                </a>
                <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
