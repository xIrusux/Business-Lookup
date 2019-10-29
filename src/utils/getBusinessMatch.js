const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

const getBusinessMatch = inputBusinessName => {
  const GUID = process.env.REACT_APP_GUID;
  console.log(GUID);
  return fetch(
    `https://abr.business.gov.au/json/MatchingNames.aspx?name=${inputBusinessName}&maxResults=10&callback=callback&guid=${GUID}`
  )
    .then(response => response.json())
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch fetchData failed ${err}`);
    });
};

module.exports = { getBusinessMatch };
