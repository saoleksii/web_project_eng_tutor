import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TutorCard from '../components/TutorCard'
import { useApi } from '../App'

function Start() {
    const { getTutors } = useApi()
    const [tutorData, setTutorData] = useState([])
    const [params, setParams] = useSearchParams()
    useEffect(() => {
        getTutors().then(data => setTutorData(data))
    }, [getTutors])
    const query = {
        name: params.get('name') || '',
        price: params.get('maxPrice') || '',
        sort: params.get('sort') || ''
    }
    const displayTutors = tutorData
        .filter(t => t.name.toLowerCase().startsWith(query.name.toLowerCase()))
        .filter(t => !query.price || t.price <= query.price)
        .sort((a, b) => !query.sort ? 0 : (query.sort === 'asc' ? a.price - b.price : b.price - a.price))
    const update = (key, val) => {
        val ? params.set(key, val) : params.delete(key)
        setParams(params)
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
                        value={query.name}
                        onChange={e => update('name', e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control shadow-sm"
                        style={{ maxWidth: '150px' }}
                        placeholder="Max price"
                        value={query.price}
                        onChange={e => update('maxPrice', e.target.value)}
                    />
                    <button
                        type=''
                        className="btn btn-outline-primary d-flex align-items-center fw-bold"
                        onClick={() => update('sort', query.sort === 'asc' ? 'desc' : 'asc')}
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