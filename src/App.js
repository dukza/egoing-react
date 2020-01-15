import React, { Component} from 'react';
import Header from './Component/Header';
import Toc from './Component/Toc';
import Contents from './Component/Contents';
import Control from './Component/Control';

class App extends Component {
    constructor(props){
      super(props);
      this.state={
        mode:'read',
        selected_id:2,
        header:{subject:'subject', sub:'sub'},
        welcome:{title:'welcome', desc:'React'},
        toc:[
          {id:1,title:'HTML',desc:'Html is'},
          {id:2,title:'CSS',desc:'Css is'},
          {id:3,title:'JS',desc:'Js is'}
        ]
      }
    }
    render() {
        var _title, _desc =null;
        if(this.state.mode === 'welcome'){
          _title = this.state.welcome.title;
          _desc = this.state.welcome.desc;
        }else if(this.state.mode === 'read'){
          for(var i=0; i<this.state.toc.length; i++){
            var data = this.state.toc[i]
            if(this.state.selected_id === data.id){
              _title = data.title;
              _desc = data.desc;           
            }            
          }
        }
        return(
            <div>
              <Header 
              subject={this.state.header.subject} 
              sub={this.state.header.sub}
              onChangePage={function(){
                this.setState ({
                  mode:'welcome'
                })
              }.bind(this)}
              />
              <Toc 
              toc={this.state.toc}
              onChangePage={function(id){
                this.setState({
                  mode:'read',
                  selected_id:Number(id)
                });
              }.bind(this)} 
              />
              <Control
              onChangeMode={function(_mode){
                this.setState({
                  mode:_mode
                })
              }.bind(this)}
              />
              <Contents title={_title} desc={_desc}/>
            </div>
        );
    }
}

export default App;