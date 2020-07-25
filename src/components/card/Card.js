import React from 'react'

import './Card.style.scss';

const Card = () => {
    return (
        <div>
            <div className="card-wrapper">
                <div className="card-header">
                    <span>Header</span>
                </div>
                <div className="card-body">
                    <div className="card-content">
                        Content
                        </div>
                </div>
                <div className="card-footer">Footer</div>
            </div>
        </div>
    )
}

export default Card
