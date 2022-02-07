import React from 'react';
import '../css/ReadView.css';
import {Form, Input, Button, Typography, Modal, Tag, Row, Col} from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import SearchView from './SearchView';


class ReadView extends React.Component {

    

    constructor(props) {
        super(props);

        this.formRef = React.createRef();
        
        this.showIndexView = this.showIndexView.bind(this);
       
        this.searchJobPostingByID = this.searchJobPostingByID.bind(this);
      
    };

    

    render() {

      const { Title } = Typography;
      const layout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 24
          },
          md: {
             offset:2,
             span: 4,
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 24
          },
          md: {
            span: 14
          }
        },
        
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            offset: 0,
          },
          sm: {
            offset:0
          },
          md: {
            offset:6
          },
        },
      };

     

       return (
            
          <div>
           
            <Title level={2} className = 'viewJobDetailsTitle'>VIEW JOB DETAILS</Title>
            <Row className = 'tagRow'>
              <Col span={24}>
               
                <Tag className = "notificationTag" color="green" visible = {this.props.showUpdateJobPostingNotification}>
                  <CheckCircleTwoTone className = "checkIcon" twoToneColor="#52c41a" /> Job posting details with title " 
                  {this.props.jobPosting ? this.props.jobPosting.title: ''}" have been updated successfully.</Tag>

              </Col>
            </Row>
           
            <SearchView _id = {  this.props.jobPosting._id  } 
              searchJobPostingByID = {this.searchJobPostingByID}/>
            <div id="view-container" style={{padding: "24px"}}>
                <Form {...layout}  ref={this.formRef}  name="job_posting" className = "viewJobPosting">

                    <Form.Item name={[ 'title']} label="Title">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name={['city']} label="City">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name={['employer']} label="Employer">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name={['requirements']} label="Requirements">
                        <Input.TextArea  rows={4} disabled/>
                    </Form.Item>
                    <Form.Item name={['tasks']} label="Tasks">
                        <Input.TextArea rows={4} disabled/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...tailFormItemLayout.wrapperCol }}>
                      <Button type="primary" htmlType="button" className = "viewJobsPostingsButton" onClick = {this.showIndexView}>
                        VIEW JOBS
                      </Button>
                     </Form.Item>
                </Form>
            </div>
          </div>

          
          
        );
    }

    componentDidMount () {
        this.formRef.current.setFieldsValue(
             this.props.jobPosting
        );
    }

    componentDidUpdate (prevProps,prevState) {
        if(Object.keys(this.props.jobPosting).length === 1) {

            Modal.error({
              title: 'Unable to find a job posting!',
              content: 'Job posting with id "' + this._searchId + '" could not be found.',
              okText: 'Close',
              okType: 'danger',
              onOk: () => {
                console.log('Cancel button clicked');
              },
              centered: true
            });

            this.formRef.current.setFieldsValue({
              title: "",
              city: "",
              employer: "",
              requirements: "",
              tasks: ""
            });

        } else {
            this.formRef.current.setFieldsValue(this.props.jobPosting);
        }
        
    }

    searchJobPostingByID(_id) {
        this._searchId = _id;
        this.props.showReadView(_id);
       
    }

    showIndexView(event) {
        this.props.history.push('/jobPostings');
    }

   
        
      
}


export default ReadView;