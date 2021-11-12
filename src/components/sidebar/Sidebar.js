import React, { Component } from 'react'
import Folder from './Folder'
import './sidebar.css'
import Tree from './Tree'
import Document from './Document'

class Sidebar extends Component {
    state = {
        highlightId: -1,
    }

    highlightDocument = (id) => {
        this.setState({highlightId: id})
    }

    render() {
        return (
            <div className='sidebar'>
                <div className='sidebar-flex-container'>
                    <div className='profile-area'> User Profile </div>
                    <div className='search-area'> Search Area </div>
                    <div className='document-area'>
                        <Tree className='tree'>
                            <Folder name='Classes'>
                                <Folder name='Data Structures & Algorithms'>
                                    <Document name='Lecture 1' id={1} 
                                    parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>

                                    <Document name='Lecture 2' id={2} 
                                    parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>

                                    <Document name='Lecture 3' id={3} 
                                    parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>

                                </Folder>
                                <Folder name='Software Requirements'>
                                    <Folder name='Lectures'>
                                        <Document name='Lecture 1' id={4}
                                         parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>

                                        <Document name='Lecture 2' id={5}
                                         parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>

                                        <Document name='Lecture 3' id={6}
                                         parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>
                                    </Folder>
                                    <Folder name='Assignments'>
                                        <Document name='Assignment 1' id={7}
                                         parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>
                                    </Folder>
                                </Folder>
                            </Folder>
                        </Tree>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar
