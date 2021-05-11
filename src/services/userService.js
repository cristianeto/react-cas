import http from '../auth/httpService';

const apiEndpoint = '/users';

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndpoint);
}
export function getUser(userId) {
  return http.get(userUrl(userId));
}

export function saveUser(user) {
  console.log('saving...');
  if (user.id) {
    const body = { ...user };
    delete body.id;
    return http.put(userUrl(user.id), body);
  }
  return http.post(apiEndpoint, user);
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}
