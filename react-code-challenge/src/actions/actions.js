export const DELETE_JOB_POSTING = 'DELETE_JOB_POSTING';
export const CREATE_JOB_POSTING = 'CREATE_JOB_POSTING';
export const SHOW_READ_VIEW = 'SHOW_READ_VIEW';

export const RESET_DELETE_NOTIFICATION = 'RESET_DELETE_NOTIFICATION';
export const SHOW_UPDATE_VIEW = 'SHOW_UPDATE_VIEW';
export const UPDATE_JOB_POSTING = 'UPDATE_JOB_POSTING';

export function deleteJobPosting(jobPostingID) {
    return { type: DELETE_JOB_POSTING, id: jobPostingID }
}

export function createJobPosting(jobPosting) {
  return { type: CREATE_JOB_POSTING, jobPosting: jobPosting }
}


export function showReadView(jobPostingID) {
  return { type: SHOW_READ_VIEW, id: jobPostingID};
}

export function resetDeleteNotificationVisible() {
  return { type: RESET_DELETE_NOTIFICATION };
}

export function showUpdateView(jobPostingID) {
  return { type: SHOW_UPDATE_VIEW, id: jobPostingID};
}

export function updateJobPosting(jobPosting) {
  return { type: UPDATE_JOB_POSTING, jobPosting: jobPosting};
}
  
  