import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {launch} from './types'
const ALL_LAUNCHES = gql`
  query{
    launches{
      mission_name,
      launch_success,
      flight_number
    }
  }
`
function App() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ALL_LAUNCHES);
  const [flightdata, setdata] = useState< launch[] | [] >([]);
  let a:number=0;
  useEffect(() => {
    if (data) {
      console.log(data.launches);
      setdata(data.launches);
    }
    if (error) {
      alert("An error occured")
    }

  }, [data, loading, error])
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-700 to-gray-900 ">
      <div className="text-center py-20 text-3xl text-white font-mono">Spacex data with graphql</div>
      <div className="max-w-screen-md justify-center mx-auto py-10">
        {loading && <div className="text-center text-white text-3xl font-mono">Loading...</div>}
        {error && <div className="text-center text-white">An error occured</div>}
        {!loading && flightdata.map((flight) => {
          a+=1
          return (
            <div key={flight.flight_number} className="shadow-2xl bg-gray-800 w-full bg-indigo text-white my-5 py-4 px-3 text-left rounded-md flex justify-between align-middle items-center">
              <div>
                <h2 className="text-xl font-mono">{a}.{flight.mission_name}</h2>
                {
                  flight.launch_success ?
                    <p className="text-base px-6 py-1 ">Status:<span className="text-green-600 px-1">Success</span></p>
                     :
                    <p className="text-base px-6 py-1 ">Status:<span className="text-red-600 px-1">Failed</span></p>
                }
                
              </div>
              <button className="bg-green-900 py-2 px-4 rounded-md font-mono" onClick={()=>{
                navigate(`/view/${flight.flight_number}`)
              }}>View</button>
            </div>
          )
        })}        
      </div>
    </div>
  );
}

export default App;
