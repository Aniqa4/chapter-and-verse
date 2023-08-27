import { useEffect, useState } from "react";

function Publications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/publishers')
          .then(res => res.json())
          .then(data => setPublications(data))
      }, []);

  return [publications,setPublications]
}

export default Publications