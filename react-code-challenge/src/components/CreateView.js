import React from 'react';
import 'antd/dist/antd.css';
import '../css/CreateView.css';
import FormView from './FormView';
import { Typography } from 'antd';

class CreateView extends React.Component {

  constructor(props) {

    super(props);
    this.createJobPosting = this.createJobPosting.bind(this);
      
  }
  
  render() {
    const { Title } = Typography;
    
    return (
       
        <div id="create-container" style={{padding: "24px"}}>
          <Title level={2} className = 'createJobPostingFormTitle'>CREATE A JOB POSTING</Title>
          <FormView _formTarget = 'CREATE' submitJobPosting = {this.createJobPosting}></FormView>

        </div>    
      );
    }

  createJobPosting(jobPosting) {
    
      console.log(jobPosting);
      this.props.createJobPosting(jobPosting);
      this.props.history.push('/jobPostings');
      

  }


  }
  
  export default CreateView;