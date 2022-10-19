import { Link, graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const flatListToHierarchical = (
    data = [],
    {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
        const newItem = {...item};
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};

function createMenu(nodes) {
    return nodes.map(({key, url, title, children}) => (
        <li key={key}>
            <Link to={url}>{title}</Link>
            {children.length > 0 &&
                <ul>
                    {createMenu(children)}
                </ul>
            } 
        </li>
    ))
}

const Navigation = () => {
    const menuItems = flatListToHierarchical(useStaticQuery(graphql`
    {
        allWpMenuItem(filter: {locations: {eq: MENU_1}}) {
          nodes {
            key: id
            parentId
            title: label
            url
          }
        }
    }      
    `).allWpMenuItem.nodes);

    console.log(menuItems);

    return (
        <div>
            <ul>
                {createMenu(menuItems)}
            </ul>
        </div>

    )
}


export default Navigation