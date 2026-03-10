import React, { useState } from 'react'

const TutorCard = ({ tutor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const formatDescription = (text) => {
        if (!text) return "No description provided.";
        if (text.length <= 80 || isExpanded) return text;
        return text.substring(0, 140) + "...";
    };
    return (
        <div className="card shadow-sm mb-4 w-100" style={{ maxWidth: '800px' }}>
            <div className="row g-0">
                <div className="col-md-3 p-3">
                    <img 
                        src={tutor.photo || 'https://placehold.co/150'} 
                        alt={tutor.name} 
                        className="img-fluid rounded border"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="col-md-9">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                            <p className="card-title text-primary fw-bold mb-0 fs-4">{tutor.name}</p>
                            <span className="badge bg-success fs-6">{tutor.price} UAH/H</span>
                        </div>
                        
                        <div className="mb-2">
                            <small className="text-muted fw-bold fs-6">Education:</small>
                            <p className="card-text mb-2 text-dark fs-6" style={{ fontSize: '0.9rem' }}>
                                {tutor.education || 'Not specified'}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small className="text-muted fw-bold fs-6">Experience:</small>
                            <p className="card-text mb-2 text-dark fs-6" style={{ fontSize: '0.9rem' }}>
                                {tutor.experience || 'Not specified'}
                            </p>
                        </div>
                    </div> 
                </div>
                <div className="px-3">
                    <div style={{maxWidth: '80%'}}>
                    <small className="text-muted fw-bold fs-6">About me:</small>
                        <p className="card-text text-secondary fs-6">
                            {formatDescription(tutor.description)}
                            {tutor.description?.length > 140 && (
                                <button 
                                    className="btn btn-link btn-sm p-0 ms-1 text-decoration-none" 
                                    onClick={() => setIsExpanded(!isExpanded)}>
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <button className="btn btn-primary px-4 shadow-sm fw-bold">Book a lesson</button>
                </div>
            </div>
        </div>
    )
}

export default TutorCard