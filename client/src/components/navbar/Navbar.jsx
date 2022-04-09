import React, { useState } from 'react';
import "./Navbar.scss";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";


const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll=()=>{
        setIsScrolled((window.pageYOffset) === 0 ? false : true);
        return ()=>(window.onscroll = null );
    }

  return (
    <div className={isScrolled ? "navbar scrolled " : "navbar"}>
        <div className='container'>
            <div className='left'>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=''
                />
                 <span>Homepage</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
           
            <div className='right'>
                <Search  className='icon' />
                <span>KIDs</span>
                <Notifications  className='icon'  />
                <img 
                src="https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/275147071_1401993493576679_9003083421766184741_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFxZdWnva0upzC4E0JAReA-x0A5B7BVtsHHQDkHsFW2wYu27B4aZEVejJFR5i24a3ew5J08RMWJ0yGbYyHZU6rE&_nc_ohc=TPf9zSTbLUsAX8nDfDM&tn=2GKlVonwIywTs0Dh&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&oh=00_AT9ga5K_fmYelIyTv66Yh1aXLHgeKA7vvM_GLYfzq5iicw&oe=6256B4E2"
                alt=''
                />
                <div className="profile">
                    <ArrowDropDown  className='icon'  />
                    <div className="options">
                        <span>Settings</span>
                        <span>Logout</span>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default Navbar