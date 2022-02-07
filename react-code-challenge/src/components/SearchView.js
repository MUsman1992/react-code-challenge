import React from 'react';
import 'antd/dist/antd.css';
import '../css/SearchView.css'
import { Input } from 'antd';
import { Row, Col } from 'antd';


class SearchView extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            jobID: this.props._id
        }
        
        this.searchJobPostingByID = this.searchJobPostingByID.bind(this);
    }

    render() {
        const { Search } = Input;
        return(

            <Row className = "searchRow">
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 4, offset: 2 }}>
                    <label className = "searchLabel" >Search by id...</label>
                </Col>
                <Col className = "searchInput" xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10 }}>
                    
                    <Search  placeholder="Enter ID..." defaultValue = {this.state.jobID} onChange = {(event) => this.setState({jobID: event.target.value})} onSearch={this.searchJobPostingByID} enterButton />
                </Col>
            </Row>
           
                

            
        );

    }

    
    searchJobPostingByID(value) {
        this.props.searchJobPostingByID(this.state.jobID);

    }

}



export default SearchView;