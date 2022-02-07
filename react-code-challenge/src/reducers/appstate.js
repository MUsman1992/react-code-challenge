import jobPostings from '../json/jobpostings.json';
import { DELETE_JOB_POSTING, CREATE_JOB_POSTING, SHOW_READ_VIEW, 
             RESET_DELETE_NOTIFICATION, SHOW_UPDATE_VIEW, UPDATE_JOB_POSTING} from '../actions/actions'


jobPostings.forEach(function (jobPosting) {
      jobPosting.key = jobPosting._id;
      jobPosting.requirements = typeof jobPosting.requirements === 'string' ?  jobPosting.requirements : jobPosting.requirements.join();
      jobPosting.tasks = typeof jobPosting.requirements === 'string' ?  jobPosting.tasks : jobPosting.tasks.join();
});

const initialState = {
    uiState: {
        deleteNotificationVisible: false,
        showUpdateJobPostingNotification: false,
        noJobPostingFound: false
    },
    indexViewState: {
        jobPostings: jobPostings
    },
    readViewState: {
        jobPosting: {}
    },
    updateViewState: {
        jobPosting: {}
    },
    deletedJobPosting: {
        _id: '',
        title: ''
    }
}

export default function jobsReducer(state = initialState, action) {
    if(action.type === DELETE_JOB_POSTING) {
        let jobPosting = state.indexViewState.jobPostings.find( jobPosting => jobPosting._id === action.id) ;
        let jobPostings = state.indexViewState.jobPostings.filter( jobPosting => jobPosting._id !== action.id) ;
        let indexViewState = Object.assign({}, state.indexViewState, {
            jobPostings: jobPostings
        });
        let uiState = Object.assign({}, state.uiState, {
            
            deleteNotificationVisible: true,
        });
        let deletedJobPosting = Object.assign({},  jobPosting );
        return { ...state, indexViewState, uiState, deletedJobPosting};

    } else if(action.type === RESET_DELETE_NOTIFICATION) {
        let uiState = Object.assign({}, state.uiState, {
            deleteNotificationVisible: false,
        });
        return { ...state, uiState};
        
    } else if(action.type === CREATE_JOB_POSTING) {
        let jobPostings = [...state.indexViewState.jobPostings, action.jobPosting] ;
        let indexViewState = Object.assign({}, state.indexViewState, {
            jobPostings: jobPostings
        });
        return { ...state, indexViewState};
    } else if(action.type === SHOW_READ_VIEW) {
        let uiState = Object.assign({}, state.uiState, {
            showUpdateJobPostingNotification: false
        });
        let jobPosting = state.indexViewState.jobPostings.find((jobPosting) => jobPosting._id === action.id);
        if(jobPosting === undefined || jobPosting === null) {
            jobPosting = {};
            jobPosting._id = action.id;
        }
        let readViewState = Object.assign({}, {
             jobPosting: jobPosting
        });
        return { ...state, uiState, readViewState };

    } else if(action.type === SHOW_UPDATE_VIEW) {
        let uiState = Object.assign({}, state.uiState, {
        });
        let jobPosting = state.indexViewState.jobPostings.find((jobPosting) => jobPosting._id === action.id);
        if(jobPosting === undefined || jobPosting === null) {
            jobPosting = {};
            jobPosting._id = action.id;
            uiState['noJobPostingFound'] = true;
        } else {
            uiState['noJobPostingFound'] = false;
        }
        let updateViewState = Object.assign({}, {
            jobPosting: jobPosting
        });
       return {...state, uiState, updateViewState};
        
    } else if(action.type === UPDATE_JOB_POSTING) {
        let uiState = Object.assign({}, state.uiState, {
            showUpdateJobPostingNotification: true
        });
        let jobPostings = state.indexViewState.jobPostings.map( (jobPosting) => {
            if (jobPosting._id === action.jobPosting._id) {
                return {
                    _id: action.jobPosting._id,
                    key: action.jobPosting.key,
                    title: action.jobPosting.title,
                    city: action.jobPosting.city,
                    employer: action.jobPosting.employer,
                    requirements: action.jobPosting.requirements,
                    tasks: action.jobPosting.tasks
                }
            }
            return jobPosting;
        });
        let indexViewState = Object.assign({}, state.indexViewState, {
            jobPostings: jobPostings
        });
       
        let readViewState = Object.assign({}, state.readViewState, {
            jobPosting: action.jobPosting
        });
        return {...state, indexViewState, uiState, readViewState};
        
    } else {
        return state;
    }
   
}
