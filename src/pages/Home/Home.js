import React, { Component } from 'react'
import FillerText from '../../components/FillerText'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css'

export class Home extends Component {
    render() {
        return (
            <div className='flex-container'>
                <Sidebar/>
                <FillerText/>
            </div>
        )
    }
}

export default Home
