import axios from "axios";
import { useEffect, useState } from "react";

function Publications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        axios.get('https://chapter-and-verse-server-side.vercel.app/publishers')
          .then(data => setPublications(data.data))
      }, []);

  return [publications,setPublications]
}

export default Publications