import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Membership = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { data } = await API.get('/memberships');
                setPlans(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleOpenPayment = (plan) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            toast.error('Please login to subscribe');
            return;
        }
        setSelectedPlan(plan);
        setShowPayment(true);
    };

    const handleConfirmPayment = async () => {
        try {
            await API.post('/payments', {
                amount: selectedPlan.price,
                paymentMethod: 'Chapa (Mobile Money)',
                type: 'Membership',
                transactionId: 'CHAPA_' + Math.random().toString(36).substr(2, 9).toUpperCase()
            });
            toast.success(`Payment received! Your ${selectedPlan.name} membership is active.`);
            setShowPayment(false);
        } catch (error) {
            toast.error('Payment processing failed. Please try again.');
        }
    };

    if (loading) return <Loader />;

    return (
        <div id='presentaion'>
            <div className='pr-heading'>
                <h1>UNLEASH YOUR <span>POTENTIAL</span></h1>
                <p className='details'>Choose a membership plan designed for champions. No hidden fees, just pure results.</p>
                <div className='plans-container'>
                    {plans.map(plan => (
                        <div key={plan._id} className='plan-card'>
                            {plan.name === 'Premium' && <div className="best-value-badge">BEST VALUE</div>}
                            <h2>{plan.name}</h2>
                            <h3 className="price">ETB {plan.price} <span>/ {plan.duration}</span></h3>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <span>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleOpenPayment(plan)} className='pr-btn'>CHOOSE PLAN</button>
                        </div>
                    ))}
                </div>
            </div>

            {showPayment && (
                <div className='modal-overlay'>
                    <div className='modal-content' style={{ textAlign: 'center' }}>
                        <span className='modal-close' onClick={() => setShowPayment(false)}>&times;</span>
                        <div style={{ background: '#FF1414', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
                            <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>C</span>
                        </div>
                        <h2>Chapa Checkout</h2>
                        <p style={{ color: '#ccc', marginBottom: '30px' }}>Payment to <strong>GYM RAT PLATFORM</strong></p>
                        <div style={{ background: '#222', padding: '20px', borderRadius: '10px', marginBottom: '30px', textAlign: 'left' }}>
                            <p style={{ margin: '0', fontSize: '0.8rem', color: '#999' }}>TOTAL AMOUNT</p>
                            <p style={{ margin: '5px 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>ETB {selectedPlan.price}.00</p>
                        </div>
                        <button onClick={handleConfirmPayment} className='modal-btn' style={{ background: '#28a745' }}>PAY SECURELY</button>
                        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>Secured by Chapa Payment Gateway</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Membership;
