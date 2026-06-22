import "./DogProfile.css";
// import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

type Dog = {
  _id: string;
  name: string;
  breed: string;
  birthday?: string;
  photo?: string;
  notes?: string;
  gender?: string;
};

function DogProfile() {
  //   const [dogData, setDogData] = useState<Dog[]>([]);

  const params = useParams();
  console.log(params);

  const api = `http://localhost:5001/dogs/${params.id}`;
  const { data } = useFetch<Dog>(api);
  console.log(data);

  return (
    <>
      {data && (
        <>
          <h1>dog info</h1>
          <p>{data.name}</p>
        </>
      )}
    </>
  );
}

export default DogProfile;
