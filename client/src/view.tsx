import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { launch } from './types'

function View() {
    const { flight_number } = useParams()
    const [flightdata, setdata] = useState<launch | null>(null)
    const GET_FLIGHT_DETAILS = gql`
    query {
        launch(flight_number: ${flight_number}) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket {
                rocket_id
                rocket_type
        }
    }
}
    `
    const { loading, error, data } = useQuery(GET_FLIGHT_DETAILS)
    useEffect(() => {
        if(data){
            console.log(data.launch)
            setdata(data.launch)
        }
    }, [loading, data, error])
    return (
        <div className=" font-mono bg-gradient-to-tr from-gray-900 to-gray-800 min-h-screen py-20">
            {
                flightdata ?
                <div className="max-w-screen-md border-2 rounded-md shadow-2xl border-gray-800 mx-auto px-3 py-4 relative mi">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl flex items-center ">
                            <IoArrowBack className="absolute cursor-pointer" />
                            <div className="px-8">{flightdata.mission_name}</div>
                        </div>
                        {
                            flightdata.launch_success ?
                            <div className="text-green-500 text-xl">Success</div>
                            :
                            <div className="text-red-500 text-xl">Failed</div>
                        }

                    </div>
                    <div className="text-base text-white my-3 mt-7 px-7 font-mono">
                        Flight number: <span className="text-gray-400">{flight_number}</span>
                    </div>
                    <div className="text-base text-white my-3 px-7 font-mono">
                        Mission name: <span className="text-gray-400">{flightdata.mission_name}</span>
                    </div>
                    <div className="text-base text-white my-3 px-7 font-mono">
                        Rocket id: <span className="text-gray-400">{flightdata.rocket.rocket_id}</span>
                    </div>
                    <div className="text-base text-white my-3 px-7 mb-7 font-mono">
                        Rocket type: <span className="text-gray-400">{flightdata.rocket.rocket_type}</span>
                    </div>
                    <div className="flex justify-between items-center bottom-0 left-0 pt-3 border-t-2">
                        <div className="text-base text-white">
                           Launch year: {flightdata.launch_year}
                        </div>
                        <div className="text-base text-white">
                            Launch date: {flightdata.launch_date_local}
                        </div>
                    </div>
                </div>
           
                :
                <div className="text-center text-white">
                    <div className="text-xl">Loading...</div>
                </div>

                }
        </div>
    )
}

export default View
