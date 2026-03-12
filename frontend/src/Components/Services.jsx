import React from 'react';
import icon1 from '../images/1.svg';
import icon2 from '../images/2.svg';
import icon3 from '../images/3.svg';
import icon4 from '../images/4.svg';

function Services() {
    const servicesData = [
        {
            id: 1,
            image: icon1,
            title: "Weightlifting",
            description: "Expert coaching for seated and standing dumbbell exercises to build raw strength and muscle mass."
        },
        {
            id: 2,
            image: icon2,
            title: "Cardio Training",
            description: "High-intensity pedal-based exercises designed to improve heart health and burn calories efficiently."
        },
        {
            id: 3,
            image: icon3,
            title: "Dumbbell Mastery",
            description: "Focused training on one-hand dumbbell movements for unilateral strength and core stability."
        },
        {
            id: 4,
            image: icon4,
            title: "Endurance Pedals",
            description: "Long-form endurance training to build stamina and lower body power with specialized equipment."
        }
    ];

    return (
        <div id='services' style={{ padding: '100px 5%', backgroundColor: '#000', textAlign: 'center' }}>
            <h1 style={{ color: '#fff', fontSize: '3rem', textTransform: 'uppercase', marginBottom: '10px' }}>OUR <span>SERVICES</span></h1>
            <p style={{ color: '#999', marginBottom: '60px' }}>Professional equipment and techniques to accelerate your fitness journey.</p>
            <div className='services-container' style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {servicesData.map(service => (
                    <div key={service.id} className='service-box' style={{
                        background: '#0d0d0d',
                        padding: '50px 30px',
                        borderRadius: '20px',
                        border: '1px solid #1a1a1a',
                        transition: '0.4s'
                    }}>
                        <div className='service-icon' style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ background: '#FF141411', padding: '20px', border: '1px solid #FF141433', borderRadius: '50%' }}>
                                <img src={service.image} alt={service.title} style={{ width: '45px', height: '45px', filter: 'invert(1) brightness(2)' }} />
                            </div>
                        </div>
                        <h2 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '15px' }}>{service.title}</h2>
                        <p style={{ color: '#cecece', fontSize: '1rem', lineHeight: '1.6' }}>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
