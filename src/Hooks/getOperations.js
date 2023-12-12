let URL= import.meta.env.VITE_BASE_URL

function getData(endPoint) {
    const url=`${URL}/${endPoint}`
  return url
}

export default getData