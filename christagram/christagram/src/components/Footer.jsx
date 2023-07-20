import joker from '../images/joker.jpg'
function Footers() {
    return(
<div className='footer'>
  <div className='text'>
  <h3>⏰ The clock is ticking, and the Social Sphere is calling your name! <br></br>Embrace the adventure, unleash your potential,<br></br> and join a movement that's transforming lives,<br></br> one connection at a time! ⏰</h3>

  </div>
  <div className='joker'>
  <img src={joker} alt="phone" />
  </div>
  <div className='social'>
    <h2>Your can find our socials on the following platforms for any inquiries or feedbacks</h2>
    <ul>
          <li>
          <a href='tvshows'>About Us</a>
          </li>
          <a href='tvshows'>Contact Us</a> 
          <li>
          <a href='tvshows'>@Facebook</a>
          </li>
          <li>
          <a href='tvshows'>@Instagram IG</a>
          </li>
          <li>
          <a href='tvshows'>@Help Centre</a>
          </li>
          <li>
          <a href='tvshows'>@Social media</a>
          </li>
          <li>
          <a href='tvshows'>@Feedback</a>
          </li>
        </ul>

  </div>

</div>


    )
  }
  
  export default Footers;
  