import React from 'react'
import './LandingPage.css'


import video from '../assets/images/1763784441386654.mp4'
import vid from '../assets/images/1763788206124201.mp4'

function LandingPage() {
  return (
    <div className='land'>
        
        <section className="hero-section">
            {/* <p>Connecting organisations with reliable, cost-effective food sourcing — ensuring no plate goes empty.</p> */}
        </section>

        <section className="mission">
          
            <h2 className='mission-headline'>
                Our Mission
            </h2>
          
          <div className='mission-context'>
            <div className='mission-des'>
              <p>
                  At Replate, our mission is to combat hunger and reduce food waste by creating a seamless bridge between surplus food and those who need it most. We strive to ensure that food is distributed with dignity, efficiency and respect, transforming excess into opportunity and compassion into actions.
              </p>
              <p> 
              
                <br />
                Through a reliable and transparent system, Replate empowers NGOs and comunity groups to reach vulnerable populations faster, ensuring timely access to safe, nourishing meals. Our approach is guided by sustainability, social responsibilty and the belief that no edible food should ever be wasted when lives can be uplifted through its redistribution.
              </p>
            </div>

            <div className='mission-video'>
              <video controls muted autoPlay loop playsInline>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="mission-context">

            <div className="mission-video">
              <video controls muted autoPlay loop playsInline>
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
              </video>
            </div>

            <div className="mission-des">
              <p>
                Replate works closely with trusted food partners to ensure that surplus meals are handled with the highest standards of care and hygiene. Every dish prepared follows strict quality practices, ensuring that food shared through the platform remains safe, fresh, and respectful to those who receive it.
              </p>
              <p>

                <br />
                Through this model, Replate demonstrates that meaningful change is achieved not only through compassion, but through disciplined execution and shared responsibility across the food ecosystem.
              </p>
            </div>
          </div>
        </section>

    </div>
  )
}

export default LandingPage