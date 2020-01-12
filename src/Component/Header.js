import React, { Component} from 'react';

class Header extends Component {
    render(props) {
        return(
            <div>
                <h1><a href={this.props.subject} onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage();
                    }.bind(this)}>{this.props.subject}</a></h1>
                <h3>{this.props.sub}</h3>
            </div>
            

        );
    }
}

export default Header;