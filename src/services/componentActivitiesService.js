import http from '../auth/httpService';

const apiEndpoint1 = '/components';
const apiEndpoint2 = '/activities';

function componentActivitiesUrl(componentId) {
  return `${apiEndpoint1}/${componentId}${apiEndpoint2}`;
}

function componentActivityUrl(componentId, activityId) {
  return `${apiEndpoint1}/${componentId}${apiEndpoint2}/${activityId}`;
}

export function getComponentActivities(componentId) {
  return http.get(componentActivitiesUrl(componentId));
}
export function saveActivity(activity) {
  if (activity.id) {
    const body = { ...activity };
    delete body.id;
    return http.put(componentActivityUrl(activity.id), body);
  }
  return http.post(apiEndpoint1 + apiEndpoint2, activity);
}
