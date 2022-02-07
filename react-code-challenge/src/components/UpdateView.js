import React from 'react';
import '../css/UpdateView.css';
import FormView from './FormView';
import SearchView from './SearchView';
import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

class UpdateView extends React.Component {

    constructor(props) {

        super(props);
        this.updateJobPosting = this.updateJobPosting.bind(this);
        this.searchJobPostingByID = this.searchJobPostingByID.bind(this);

        // this.state = {
        //     noJobPostingFound: false
        // }
        
    };

    render() {
        const { Title } = Typography;
        
        return (
           
            <div id="update-container" style={{padding: "24px"}}>
              <Title level={2} className = 'updateJobPostingFormTitle'>UPDATE A JOB POSTING </Title>
              <div className = 'noJobPostingFoundNotification'
                style={{ display: this.props.noJobPostingFound ? 'block': 'none'}}>
                  <CloseCircleOutlined />
                  <span>Unable to find a job posting with id { this.props.jobPosting._id }.</span>
              </div>
              <SearchView _id = { this.props.jobPosting._id } searchJobPostingByID = {this.searchJobPostingByID}/> 
              { !this.props.noJobPostingFound && <FormView _formTarget = 'UPDATE' submitJobPosting = {this.updateJobPosting} initialValues 
                = {this.props.jobPosting}></FormView> }
    
            </div>    
          );
    } 

    updateJobPosting(jobPosting) {
        this.props.updateJobPosting(jobPosting);
        this.props.history.push('/viewJobPosting');
    }

    searchJobPostingByID(_id) {
        this.props.showUpdateView(_id);
    }

}

export default UpdateView;