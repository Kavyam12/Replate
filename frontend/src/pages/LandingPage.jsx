import React from 'react'
import './LandingPage.css'


import video from '../assets/images/1763784441386654.mp4'
import vid from '../assets/images/1763788206124201.mp4'

import NGO from '../assets/images/NGO.jpeg'
import Volunteer from '../assets/images/Volunteer.jpg'
import Chef from '../assets/images/Chefs.jpeg'
import regicon from '../assets/icons/add.png'

import Button from "../components/common/buttons.jsx"
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className='land'>
        
        <section className="hero-section">
            
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

        <section className="hit">
          
            <h2 className='hit-heading'>How it Works</h2>
          

          <div className="hit-content">

              <div className="hit-flashcard">
                <div className="flashcard-heading">
                  <h3>NGO</h3>
                </div>

                <div className="flashcard-img">
                  <img src={NGO} alt="NGO" />
                </div>

                <div className="flashcard-content">
                  <p>NGOs play a vital role in ensuring that surplus food reaches communities in need. Through Replate, NGOs can efficiently request, track, and organise food distributions with transparency and ease. This enables faster response times, reduced operational burden and a reliable flow of nutritious meals to vulnerable populations all while upholding dignity and accountabilty</p>
                </div>

              </div>

              <div className="hit-flashcard">
                <div className="flashcard-heading">
                  <h3>Volunteers</h3>
                </div>

                <div className="flashcard-img">
                  <img src={Volunteer} alt="Volunteer" />
                </div>

                <div className="flashcard-content">
                  <p>Volunteers are the backbone of the last mile delivery. They ensure that food travels safely from donors to beneficiaries with care and commitment. Replate empowers volunteers with real-time coordination, clear pickup routes and meaningful opportunities to serve their communities transforming compassion ito tangible actions.</p>
                </div>

              </div>

              <div className="hit-flashcard">
                <div className="flashcard-heading">
                  <h3>Restaurants</h3>
                </div>

                <div className="flashcard-img">
                  <img src={Chef} alt="Chefs" />
                </div>

                <div className="flashcard-content">
                  <p>Restaurants become powerful agents of change by redirecting surplus food that would o waste. using Replate, they can schedule food donations seamlessly, ensuring excess meals are safely collected and reused. This not only minimizes waste and disposal costs but also strengthens their social responsibility footprint and contribution to sustainabilty.</p>
                </div>

              </div>

          </div>
        </section>


        <section className="cta">

          
            <h2 className='cta-heading'>Let's make impact your next sustainability channel</h2>
          

          <div className="cta-content">
            <p>Access food faster for efficent distribution</p>
            <p>Enable safe and timely delivery</p>
            <p>Reduce food waste responsibility</p>
          </div>

          <div className="cta-button">
            <div className="btn">
              <Button 
                      text="Register"
                      variant="secondary"
                      icon={<img src={regicon} alt="registration" />}
                      onClick={() => navigate('/registration')}
                      
              />
            </div>
            

          </div>
        </section>

    </div>
  )
}

export default LandingPage