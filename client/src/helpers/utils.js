export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue; // aakash 123 => aakash%2020123

    if (property !== "image") {
      encodedValue = encodeURIComponent(params[property]);
    } else {
      encodedValue = params[property];
    }

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123213'
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("accessToken");
}
