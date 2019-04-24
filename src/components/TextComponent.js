import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class TextComponent extends Component {
    
    render() {
        return (
            <div className="text-field">
                <TextField
                required
                error={this.props.testError}
                helperText={this.props.testHelper}
                id="text"
                label={this.props.testLabel}
                name={this.props.name}
                type="number"
                value={this.props.testValue}
                onChange={this.props.testChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">{this.props.adornment}</InputAdornment>
                    ) 
                }}
                />
            </div>
        );
    }
}

export default TextComponent;