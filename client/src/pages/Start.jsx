import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import TutorCard from '../components/TutorCard'

function Start() {
    const [tutorData, setTutorData] = useState([])

    useEffect(() => {
        const fetchTutors = async() => {
            try{
                const { data } = await api.get('/tutors')
                setTutorData(data)
            }
            catch(err){
                console.error("Failed to download data")
            }
        }
        fetchTutors()
    }, [])

    return (
        <div className="container mt-5">
            <h2 className="mb-5 text-center fw-bold">Choose your English Tutor</h2>
            <div className="row justify-content-center">
                {tutorData.length > 0 ? (
                    tutorData.map((tutor) => (
                        <div key={tutor._id} className="col-md-8 mb-4">
                            <TutorCard tutor={tutor} />
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-5">
                        <h4 className="text-muted">No tutors found</h4>
                        <p>Try again later or contact support</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Start