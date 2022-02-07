import React from 'react';
import 'antd/dist/antd.css';
import '../css/FormView.css';
import {Form, Input, Button}  from 'antd';



class FormView extends React.Component {

    constructor(props) {

        super(props);

        // this.state = {
        //     jobPosting: {
        //         _id: "",
        //         title: "",
        //         city: "",
        //         employer: "",
        //         requirements: "",
        //         tasks: ""
        //     }
        // };

        this.formRef = React.createRef();

        this.onJobPostingFormValuesChangeHandler = this.onJobPostingFormValuesChangeHandler.bind(this);
        this.submitJobPosting = this.submitJobPosting.bind(this);
        this.formButton = this.formButton.bind(this);
    
    }

    render() {

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
                    span: 8,
                    offset: 0,
                },
                sm: {
                    span: 8,
                     offset:0
                },
                md: {
                    offset:6
                },
            },
        };

        var idDisabled = this.props._formTarget === 'UPDATE' ? true : false;
        var inputProps = {
            disabled : idDisabled
          };

        return (
            <Form  {...layout} ref={this.formRef} name="job_posting" onValuesChange = {this.onJobPostingFormValuesChangeHandler}
                onFinish = {this.submitJobPosting} className = "jobPostingForm">
                <Form.Item name={[ '_id']} label="ID"
                    rules={[
                        {
                            required: true,
                            message: 'Please input job id.'
                        },
                    ]}
                >
                    <Input placeholder="ENTER JOB ID" {...inputProps}/>
                </Form.Item>
                <Form.Item name={[ 'title']} label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input job title.'
                        },
                    ]}
                >
                    <Input placeholder="ENTER JOB TITLE"/>
                </Form.Item>
                <Form.Item name={['city']} label="City"
                    rules={[
                        {
                            required: true,
                            message: 'Please input name of the city.'
                        },
                    ]}
                >
                    <Input placeholder="ENTER CITY NAME"/>
                </Form.Item>
                <Form.Item name={['employer']} label="Employer"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter company name.'
                        },
                    ]}
                >
                    <Input placeholder="ENTER EMPLOYER NAME"/>
                </Form.Item>
                <Form.Item name={[ 'requirements']} label="Requirements"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter job requirements.'
                        },
                    ]}
                >
                    <Input.TextArea placeholder="ENTER JOB REQUIREMENTS" rows={4}/>
                </Form.Item>
                <Form.Item name={[ 'tasks']} label="Tasks"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter list of the job tasks.'
                        },
                    ]}
                >
                    <Input.TextArea placeholder="ENTER TASKS LIST" rows={4}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...tailFormItemLayout.wrapperCol }}>
                    {this.formButton()}
                </Form.Item>
        </Form>
       
       
        );
    }

    componentDidMount () {
        if(this.props.initialValues) {
            this.formRef.current.setFieldsValue(
                this.props.initialValues
              );
            // this.setState({jobPosting: this.props.initialValues})
        }
    }

    componentDidUpdate () {
        if(this.props.initialValues) {
            this.formRef.current.setFieldsValue(
                this.props.initialValues
            );
            // var jobPosting = this.state.jobPosting; 
            // var didStateChange = false;
            // for(var prop in this.props.initialValues) {
            //     if(jobPosting[prop] !== this.props.initialValues[prop]) {
            //         // jobPosting[prop] = this.props.initialValues[prop];
            //         didStateChange = true;
            //         break;
            //     }
            // }
            // if(didStateChange) {
            //     this.setState({jobPosting: this.props.initialValues});
            // }  
            
        }
    }

    onJobPostingFormValuesChangeHandler(changedValues, allValues) {

        // var changedValuesKeys = Object.keys(changedValues);
        // var jobPosting = {
        //     _id: "",
        //     title: "",
        //     city: "",
        //     employer: "",
        //     requirements: [],
        //     tasks: []
        // };
        // jobPosting._id =  this.state.jobPosting._id;
        // jobPosting.title =  this.state.jobPosting.title;
        // jobPosting.city =  this.state.jobPosting.city;
        // jobPosting.employer =  this.state.jobPosting.employer;
        // Object.assign(jobPosting.requirements,  this.state.jobPosting.requirements);
        // Object.assign(jobPosting.tasks,  this.state.jobPosting.tasks);
        
        // for(var prop of changedValuesKeys)
        //   jobPosting[prop] = changedValues[prop];
        // this.setState( { jobPosting: jobPosting });  
    
    }

    submitJobPosting(values) {
    
        // var jobPosting = this.state.jobPosting;
        values.key = values._id;
        this.props.submitJobPosting(values);
   
    }

    formButton() {

        if(this.props._formTarget === 'CREATE') {
            return (<Button type="primary" htmlType="submit" className = "createbutton">
                        CREATE
                    </Button> )
        }
        if(this.props._formTarget === 'UPDATE') {
            return (<Button type="primary" htmlType="submit" className = "updatebutton">
                        UPDATE
                    </Button> )
        }

    }



}

export default FormView;