import { connect } from 'react-redux';
import App from '../components/App';
import { bindActionCreators } from 'redux';
import * as JobsPostingsActions from '../actions/actions'



const mapStateToProps = state => ({
    jobPostings:   state.indexViewState.jobPostings,
    readViewData:   state.readViewState.jobPosting,
    updateViewData: state.updateViewState.jobPosting,
    isIndexViewVisible: state.uiState.indexViewVisible,
    isCreateViewVisible: state.uiState.createViewVisible,
    isReadViewVisible: state.uiState.readViewVisible,
    isUpdateViewVisible: state.uiState.updateViewVisible,
    deleteNotificationVisible: state.uiState.deleteNotificationVisible,
    deletedJobPosting: state.deletedJobPosting,
    showUpdateJobPostingNotification: state.uiState.showUpdateJobPostingNotification,
    noJobPostingFound: state.uiState.noJobPostingFound

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(JobsPostingsActions, dispatch)
})
  


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


    