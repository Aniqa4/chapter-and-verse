import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

function Publications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        axiosInstance.get('/publishers')
          .then(data => setPublications(data.data))
      }, []);

  return [publications,setPublications]
}

export default Publications