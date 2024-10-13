import React from 'react'
import HeaderBox from './HeaderBox'

import { getLoggedInUser } from '@/lib/actions/user.actions'
import RightSideBar from './RightSideBar'

const AIComponent = async() => {
    const user1 = await getLoggedInUser(null)
  return (
    <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                        type="greeting"
                        title="Welcome,"
                        user = "Guest"
                        subtext="Let's get started. Access and manage your account
                        and transactions efficiently."
                    />

                </header>

                
            </div>
            <RightSideBar 
                user = {user1}
                pets = {[]}
            />
        </section>
  )
}

export default AIComponent