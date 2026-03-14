import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from './Loader';
import trainer1 from '../images/trainer_1.png';
import trainer2 from '../images/trainer_2.png';
import trainer3 from '../images/trainer_3.png';

const TrainerBooking = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [bookingData, setBookingData] = useState({
        date: '',
        timeSlot: '09:00 AM'
    });

    const imageMap = {
        'trainer_1': trainer1,
        'trainer_2': trainer2,
        'trainer_3': trainer3,
        'trainer_4': trainer1,
        'trainer_5': trainer2,
        'trainer_6': trainer3,
        'trainer_7': trainer1
    };

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const { data } = await API.get('/trainers');
                setTrainers(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    const handleOpenModal = (trainer) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            toast.error('Please login to book a trainer');
            return;
        }
        setSelectedTrainer(trainer);
        setShowModal(true);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await API.post('/bookings', {
                trainer: selectedTrainer.user._id,
                date: bookingData.date,
                timeSlot: bookingData.timeSlot
            });
            toast.success('Booking request sent successfully!');
            setShowModal(false);
        } catch (error) {
            toast.error('Booking failed: ' + (error.response?.data?.message || 'Error occurred'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div id='features'>
            <h1>MEET OUR <span>EXPERT TRAINERS</span></h1>
            <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '40px' }}>Train with the best in the industry to achieve your fitness milestones.</p>
            <div className='a-container'>
                {trainers.filter(t => t.user).map((trainer, index) => (
                    <div key={trainer._id} className='a-box'>
                        <img
                            src={imageMap[`trainer_${(index % 7) + 1}`]}
                            alt={trainer.user.name}
                            className='trainer-card-img'
                        />
                        <div className='a-b-text'>
                            <h2>{trainer.user.name}</h2>
                            <p className="specialization">{trainer.specialization.join(' • ')}</p>
                            <p className='details'>{trainer.bio}</p>
                            <div className='trainer-stats'>
                                <span>⭐ {trainer.rating?.toFixed(1) || '4.9'}</span>
                                <span>💪 {trainer.experience} Years Exp.</span>
                            </div>
                            <button onClick={() => handleOpenModal(trainer)} className='header-btn'>BOOK SESSION</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <span className='modal-close' onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Book with {selectedTrainer.user.name}</h2>
                        <form onSubmit={handleBookingSubmit}>
                            <div className='form-group'>
                                <label>Select Date</label>
                                <input
                                    type='date'
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={bookingData.date}
                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Preferred Time Slot</label>
                                <select
                                    value={bookingData.timeSlot}
                                    onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                                >
                                    <option>06:00 AM</option>
                                    <option>08:00 AM</option>
                                    <option>10:00 AM</option>
                                    <option>02:00 PM</option>
                                    <option>04:00 PM</option>
                                    <option>06:00 PM</option>
                                </select>
                            </div>
                            <button type='submit' className='modal-btn' disabled={isSubmitting}>
                                {isSubmitting ? 'BOOKING...' : 'CONFIRM BOOKING'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerBooking;
