import React, {Component} from 'react';

export class Base extends Component{
    render(){
        return(
            <div>
                <h1>Header</h1>
                {this.props.children}
            </div>
        );
    }
}

export default Base;