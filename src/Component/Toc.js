import React, { Component} from 'react';

class Toc extends Component {
    // shouldComponentUpdate(newProps,newState){
    //     if(this.props.data === newProps.data){
    //         return false;
    //     }
    //     return true;
    // }
    render(props) {
        var data = this.props.toc;
        var lists =[];
        for(var i=0; i < data.length; i++){
            lists.push(
            <li key={data[i].id}>
              <a 
                href={"/contents/"+data[i].id}
                data-id={data[i].id}
                onClick={function(e){
                    e.preventDefault();   
                    this.props.onChangePage(e.target.dataset.id);
              }.bind(this)}
              >
               {data[i].title}
              </a>
            </li>);
        }
        return(
            <div>
                {lists}
            </div>
            

        );
    }
}

export default Toc;