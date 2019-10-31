import fetchJsonp from "fetch-jsonp";

const getBusinessNames = url => {
  return fetchJsonp(url, {
    jsonpCallbackFunction: "callback"
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(ex) {
      console.log("parsing failed", ex);
    });
};

export { getBusinessNames };
