import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getDataMock,addPost} from './redux/actions';

class Maintainace extends Component{
    buttonData=()=>{
        this.props.actionFetchData();
    }
    handlePost=()=>{
        const dummy={
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
        const formData = new FormData();
        Object.keys(dummy).forEach((k) => {
            formData.append(k, dummy[k]);
        });
        this.props.actionPostData(formData);
    }
    render(){
        return(
            <>
            <div>
                <h3>Maintainace Component</h3>
            </div>
            <div>
                <button onClick={this.buttonData}>Get request</button>
            </div><br/>
            <div>
                <button onClick={this.handlePost}>Post Request</button>
            </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    allData: state.maintainance.data ,
});
  
const mapDispatchToProps = dispatch => ({
    actionFetchData: () => {
        dispatch(getDataMock());
    },
    actionPostData:(data)=>{
        dispatch(addPost(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Maintainace);