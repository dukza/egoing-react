import React, { Component} from 'react';

class ReadContent extends Component {
    render(props) {
        return(
            <div>
                <h5>{this.props.title}</h5>
                <div>{this.props.desc}</div>
            </div>
            

        );
    }
}

export default ReadContent;