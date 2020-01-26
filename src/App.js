import React, { Component} from 'react';
import Header from './Component/Header';
import Toc from './Component/Toc';
import Control from './Component/Control';
import ReadContent from './Component/ReadContent';
import CreateContent from './Component/CreateContent';
import UpdateContent from './Component/UpdateContent';


class App extends Component {
    constructor(props){
      super(props);
      this.max_toc_id = 3;
      this.state={
        mode:'welcome',
        selected_id:2,
        header:{subject:'subject', sub:'sub'},
        welcome:{title:'welcome', desc:'React'},
        toc:[
          {id:1,title:'HTML',desc:'Html is'},
          {id:2,title:'CSS',desc:'Css is'},
          {id:3,title:'JS',desc:'Js is'}
        ]
      }
      this.onChangePage = this.onChangePage.bind(this);
    }
    getReadContent(){
      for(var i=0; i<this.state.toc.length; i++){
        var data = this.state.toc[i]
        if(data.id === this.state.selected_id){
          return data;          
        }            
      }
    }
    onChangePage(_mode){
      this.setState ({
        mode:_mode
      })
    }
    getArticle(){
      var _title, _desc, _article =null;
      if(this.state.mode === 'welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article =  <ReadContent title={_title} desc={_desc}/>;
      }else if(this.state.mode === 'read'){
        var _content = this.getReadContent();
        _article =  <ReadContent title={_content.title} desc={_content.desc}/>;
      }else if(this.state.mode === 'create'){
        _article =  <CreateContent
          onSubmit = {function(_title,_desc){
            this.max_toc_id=this.max_toc_id+1;
            var _toc = Array.from(this.state.toc);
            _toc.push({id:this.max_toc_id, title:_title,desc:_desc})
            // var _toc = this.state.toc.concat(
            //   {id:this.max_toc_id, title:_title,desc:_desc}
            // );
            this.setState({
              toc:_toc,
              mode:'read',
              selected_id:this.max_toc_id
            });
          }.bind(this)}
        />;
      }else if(this.state.mode === 'update'){
        _content = this.getReadContent();
        _article =  <UpdateContent
          data = {_content}
          onSubmit = {function(_id,_title,_desc){
            var _toc = Array.from(this.state.toc);
            for(var i=0; i<_toc.length; i++){
              if(_toc[i].id === _id){
                _toc[i] = {id:_id,title:_title,desc:_desc};
                break;
              }            
            }
            this.setState({
              toc:_toc,
              mode:'read'
            });
          }.bind(this)}
        />;
      }
      return _article;
    }
    render() {  
        return(
            <div>
              <Header 
              subject={this.state.header.subject} 
              sub={this.state.header.sub}
              onChangePage={this.onChangePage}
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
                if(_mode ==='delete'){
                  if(window.confirm('정말로?')){
                    var _toc = Array.from(this.state.toc);
                    for(var i=0; i<_toc.length; i++){
                      if(_toc[i].id === this.state.selected_id){
                        _toc.splice(i,1);
                        break;
                      }            
                    }
                    this.setState({
                      toc:_toc,
                      mode:'welcome'
                    })
                    alert('complete')
                  }
                }else{
                  this.setState({
                    mode:_mode
                  })                 
                }

              }.bind(this)}
              />
              {this.getArticle()}
            </div>
        );
    }
}

export default App;