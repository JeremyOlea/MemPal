import React, { Component } from 'react'
import Folder from './Folder'
import Document from './Document'

export class Tree extends Component {
    render() {
        return (
            this.props.data.map(function(item, index) {
                if (item.type === 'folder') {
                    return (
                        <Folder key={'f-' + item.id} 
                            id={item.id}
                            name={item.name} 
                            child={item.children}
                            parentCallback={this.props.parentCallback}
                            isSelected={this.props.isSelected}
                            depth={this.props.depth}
                            parentId={this.props.parentId}/>
                    )
                }
                else if (item.type === 'document') {
                    return (
                        <Document name={item.name}
                            key={'d-' + item.id} 
                            id={item.id} 
                            parentCallback={this.props.parentCallback}
                            isSelected={this.props.isSelected}
                            parentId={this.props.parentId}/>
                    )
                }
                return (<div></div>) // will never be reached
            }, this)
        )
    }
}

export default Tree
