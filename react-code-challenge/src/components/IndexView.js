import React from 'react';
import { Table, Button, PageHeader, Descriptions, Modal} from 'antd';
import 'antd/dist/antd.css';
import '../css/IndexView.css';

class IndexView extends React.Component {

  constructor(props) {

    super(props);

    this.showCreateView = this.showCreateView.bind(this);
    this.viewJobPostingDetails = this.viewJobPostingDetails.bind(this);
    this.updateJobPosting = this.updateJobPosting.bind(this);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.deleteJobPosting = this.deleteJobPosting.bind(this);
    this.handleCancelDeleteModal = this.handleCancelDeleteModal.bind(this);

    this.state = {
      isModalVisible: false,
      deleteJobPostingModalData: {}
    }

    this.tableColumns = [
      {
        title: 'JOB TITLE',
        dataIndex: 'title',
        key: 'title',
        onCell: (record, rowIndex) => {
           return {
              onClick: event => { this.viewJobPostingDetails(event); }
           }
        }
      },
      {
        title: 'LOCATION',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'EMPLOYER',
        dataIndex: 'employer',
        key: 'employer',
      },
      {
         title: 'Action',
         key: 'action',
         width: '220px',
         render: (text, record) => (
            
           <span data-job-posting-id = {record._id}>
             <Button  onClick = {this.updateJobPosting} style={{marginBottom: "10px", marginRight: "10px"}} type="primary" > UPDATE </Button>
             <Button onClick = {this.showDeleteConfirm} type="primary" danger> DELETE </Button>
           </span>
         ),
       },
    ];

  }

  showCreateView() {
    this.props.history.push('/createJobPosting');
  }

  viewJobPostingDetails(event) {
    var jobPostingID = event.currentTarget.parentElement.getAttribute("data-row-key");
    this.props.showReadView(jobPostingID);
    this.props.history.push('/viewJobPosting');
  }

  updateJobPosting(event) {
    var jobPostingID = event.currentTarget.parentElement.getAttribute("data-job-posting-id");
    this.props.showUpdateView(jobPostingID);
    this.props.history.push('/updateJobPosting');
  }

  showDeleteConfirm(event) {
    var jobPostingID = event.currentTarget.parentElement.getAttribute("data-job-posting-id");
    var jobPostings = this.props.jobPostings;
    var jobPosting = jobPostings.find(jobPosting => jobPosting._id === jobPostingID);
    

    this.setState({isModalVisible: true});
    let modalData = Object.assign({}, jobPosting);
    this.setState({deleteJobPostingModalData: modalData});
  }

  deleteJobPosting() {
    var jobPostingId = this.state.deleteJobPostingModalData._id;
    this.props.deleteJobPosting(jobPostingId);
    this.setState({ isModalVisible: false});
    this.setState({ deleteJobPostingModalData: {} });
 
  }

  handleCancelDeleteModal() {
    this.setState({ isModalVisible: false});
    this.setState({ deleteJobPostingModalData: {} });
  }

 
 
  render() {
    return (
      <div id = "container" style={{padding: "24px 24px 24px 24px"}} >
        <PageHeader 
            className="site-page-header"
            title="JOB POSTINGS"
            subTitle="This is a list of job postings."> 
            <Descriptions size="small" >
               <Descriptions.Item label="Total job postings">{this.props.jobPostings.length}</Descriptions.Item>
            </Descriptions>
        </PageHeader>
        
        <Table  
            pagination = {{ position: 'bottom', pageSize: '5' }} 
            bordered = {true} 
            columns={ this.tableColumns } 
            dataSource={this.props.jobPostings} 
        />
         
        <Button  onClick = {this.showCreateView} className = "createbutton" type="primary" > CREATE </Button>
      
        
        <Modal
          className = 'deleteJobPostingModal'
          title="Do you want to delete this job posting ?"
          visible={this.state.isModalVisible}
          onOk={this.deleteJobPosting}
          onCancel={this.handleCancelDeleteModal}
          okText = 'Confirm'
          okType = 'danger'
        >
          <p><span className = 'jobPostingFieldTitle'>ID: </span>{this.state.deleteJobPostingModalData._id}</p>
          <p><span className = 'jobPostingFieldTitle'>TITLE: </span> {this.state.deleteJobPostingModalData.title}</p>
          <p><span className = 'jobPostingFieldTitle'>CITY: </span>{this.state.deleteJobPostingModalData.city}</p>
          <p><span className = 'jobPostingFieldTitle'>EMPLOYER: </span>{this.state.deleteJobPostingModalData.employer}</p>
          <p><span className = 'jobPostingFieldTitle'>REQUIREMENTS: </span>{this.state.deleteJobPostingModalData.requirements}</p>
          <p><span className = 'jobPostingFieldTitle'>TASKS: </span>{this.state.deleteJobPostingModalData.tasks}</p>
        </Modal>
        </div>
     
    )
  }
  
}

  export default IndexView;