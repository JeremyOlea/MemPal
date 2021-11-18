import React, { Component } from 'react'
import Folder from './Folder'
import Document from './Document'

export class Tree extends Component {
    render() {
        return (
            this.props.data.map(function(item, index) {
                if (item.type === 'folder') {
                    return (
                        <Folder key={item.id} 
                            name={item.name} 
                            child={item.children}
                            parentCallback={this.props.parentCallback}
                            isSelected={this.props.isSelected}/>
                    )
                }
                else if (item.type === 'document') {
                    return (
                        <Document name={item.name}
                            key={item.id} 
                            id={item.id} 
                            parentCallback={this.props.parentCallback}
                            isSelected={this.props.isSelected}/>
                    )
                }
                return (<div></div>) // will never be reached
            }, this)
        )
    }
}

export default Tree
