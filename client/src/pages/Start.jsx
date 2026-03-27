import { useEffect, useState } from 'react'
import api from '../api/axios'
import TutorCard from '../components/TutorCard'

function Start() {
    const [tutorData, setTutorData] = useState([])
    const [sortOrder, setSortOrder] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])
    useEffect(() => {
        const fetchTutors = async() => {
            try {
                const { data } = await api.get('/tutors')
                setTutorData(data)
            } catch(err) {
                console.error("Failed to download data")
            }
        }
        fetchTutors()
    }, [])
    const filteredTutors = tutorData.filter(tutor => {
        if (!debouncedTerm) return true
        return (tutor.name || "").toLowerCase().startsWith(debouncedTerm.toLowerCase())
    })
    const displayTutors = [...filteredTutors].sort((a, b) => {
        if (!sortOrder) return 0
        const priceA = Number(a.price) || 0
        const priceB = Number(b.price) || 0
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    const handleSort = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-5 text-center fw-bold">Choose your English Tutor</h2>
            <div className="row justify-content-center">
                <div className="col-md-8 mb-4">
                    <div className='input-group'>
                    <input
                        type="text"
                        className="form-control form-control-lg shadow-sm" 
                        placeholder="Search for a tutor"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type=''
                        className="btn btn-outline-primary d-flex align-items-center fw-bold"
                        onClick={handleSort}
                        >
                        Filter
                    </button>
                    </div>
                </div>
                {displayTutors.length > 0 ? (
                    displayTutors.map((tutor) => (
                        <div key={tutor._id} className="col-md-8 mb-4">
                            <TutorCard tutor={tutor} />
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-5">
                        <h4 className="text-muted">No tutors found</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Start