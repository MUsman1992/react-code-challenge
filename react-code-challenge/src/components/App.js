import React from 'react';
import IndexView from './IndexView';
import CreateView from './CreateView';
import ReadView from './ReadView';
import UpdateView from './UpdateView';
import { notification } from 'antd';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import '../css/App.css';





class App extends React.Component {

  render() {
    return (
      <div>
        <ul id = 'navigation'>
          <li>
            <Link to="/jobPostings">LIST</Link>
          </li>
          <li>
            <Link to="/createJobPosting">CREATE</Link>
          </li>
          <li>
            <Link to="/updateJobPosting">UPDATE</Link>
          </li>
          <li>
            <Link to="/viewJobPosting">VIEW</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/jobPostings" 
            render={(props) => <IndexView {...props} jobPostings = {this.props.jobPostings} 
            showReadView = {this.props.actions.showReadView} showUpdateView= {this.props.actions.showUpdateView} 
            deleteJobPosting={this.props.actions.deleteJobPosting} />} />
          <Route path="/createJobPosting" 
            render={(props) => <CreateView {...props} 
            createJobPosting = {this.props.actions.createJobPosting} />} />
          <Route path="/viewJobPosting" 
            render={(props) => <ReadView {...props} 
            jobPosting = {this.props.readViewData} showReadView = {this.props.actions.showReadView} showUpdateJobPostingNotification =  
            {this.props.showUpdateJobPostingNotification}/>} />
          <Route path="/updateJobPosting" 
            render={(props) => <UpdateView {...props} 
            jobPosting = {this.props.updateViewData} showUpdateView = {this.props.actions.showUpdateView}  
            updateJobPosting = {this.props.actions.updateJobPosting} noJobPostingFound = {this.props.noJobPostingFound}/>} />
          <Redirect from='/' to='/jobPostings' />
         
        </Switch>
      </div>
       
    );
  }

  componentDidUpdate() {
    if(this.props.deleteNotificationVisible) {
      var openNotificationWithIcon = this.openNotification();
      var deletedJobPosting = this.props.deletedJobPosting; 
      openNotificationWithIcon(deletedJobPosting.title);
    }
  }

  openNotification() {
    const openNotificationWithIcon = (title) => {
      var type = 'success';
      notification[type]({
        message: 'Job Posting Deleted Successfully',
        description:
          'The job posting with title "' + title  + '" has been deleted successfully.',
        placement: 'topLeft',
        onClose: () =>  { 
          this.props.actions.resetDeleteNotificationVisible();
        },
      });
      };
    return openNotificationWithIcon;
  }

}

export default App;
