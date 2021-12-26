import React, { useState } from 'react'
import { FiChevronRight, FiChevronDown, FiPlus} from "react-icons/fi"
import Tree from './Tree'

export default function NewFolder({key, name, child, parentCallback, isSelected, depth}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [children, setChildren] = useState(child);

    const addDocument = () => {
        const childrenTemp = children;
        childrenTemp.push(
            {
                id: 1000,
                type: 'document',
                name: 'Untitled Document',
                children: [],
            }
        );
        setChildren([...childrenTemp]);
        setIsOpen(true);
    }

    return (
        <div className='folder-wrapper'>
            <div className='folder' 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            >
                {isOpen ? <FiChevronDown onClick={() => setIsOpen(!isOpen)}/>
                    : <FiChevronRight onClick={() => setIsOpen(!isOpen)}/>}
                <span className='folder-name' onClick={() => setIsOpen(!isOpen)}>{name}</span>
                {isHovering && <FiPlus className='plus-icon' onClick={addDocument}/>}
            </div>
            <div className={isOpen ? 'collapsible open' : 'collapsible closed'}>
                <Tree data={children}
                    parentCallback={parentCallback} 
                    isSelected={isSelected}
                    depth={depth + 1}/>
            </div>
        </div>
    )
}
