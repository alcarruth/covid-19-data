
url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-24-2020.csv"

test_fetch = async (url)=> {
  await fetch(url).then((response) => {
    if (response.status >= 400 && response.status < 600) {
      console.log(response.status)
    }
    return response;
  }).then((returnedResponse) => {
    // Your response to manipulate
    console.log(returnedResponse)
  }).catch((error) => {
    console.log(error)
  })
}
