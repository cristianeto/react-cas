import http from "./httpService";

const apiEndpoint = "/activities";

function activityUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getActivities() {
  return http.get(apiEndpoint);
}
export function getActivity(activityId) {
  return http.get(activityUrl(activityId));
}

export function saveActivity(activity) {
  if (activity.id) {
    const body = { ...activity };
    delete body.id;
    return http.put(activityUrl(activity.id), body);
  }
  return http.post(apiEndpoint, activity);
}

export function deleteActivity(activityId) {
  return http.delete(activityUrl(activityId));
}
