import React from 'react'
import './Loader.style.scss';

export const CircleLoader = () => {
    return (
        <div className="loader-Wrapper">
            <div className="preloader-wrapper small  active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
