import React, { Component } from 'react'
import Folder from './Folder'
import Document from './Document'

export class Tree extends Component {
    render() {
        return (
            this.props.data.map(function(item, index) {
                if (item.type === 'folder') {
                    return (
                        <Folder name={item.name}>
                            <Tree data={item.children}
                            parentCallback={this.props.parentCallback} 
                            isSelected={this.props.isSelected}/>
                        </Folder>
                    )
                }
                else if (item.type === 'document') {
                    return (
                        <Document name={item.name}
                        id={item.id} 
                        parentCallback={this.props.parentCallback}
                        isSelected={this.props.isSelected}/>
                    )
                }
            }, this)
        )
    }
}

export default Tree
