import React, { Component } from 'react';

class Display extends Component {
    
    render() {
        return (
            <div className="result-container">
                {this.props.result&&(
                    <h3 className={this.props.error?'has-error' :''}>{this.props.result}</h3>
                )}
            </div>
        );
    }
}

export default Display;