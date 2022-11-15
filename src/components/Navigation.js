import { Link, graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const sortByOrder = (a, b) => {
    if(a.order > b.order) {
        return 1;
    } else if(a.order < b.order) {
        return -1;
    } else {
        return 0;
    }
}

const sortAllTree = (tree) => {
    return tree.sort(sortByOrder).map(item => {
        item.children = sortAllTree(item.children);

        return item;
    })
}

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
    return sortAllTree(tree);
};

function createMenu(nodes) {
    return nodes.map(({key, url, title, children}) => (
        <li key={key}>
            {url.indexOf("http") === 0 ?
                <a href={url} target="_blank" rel="noreferrer">{title}</a>
                :
                <Link to={url}>{title}</Link>
            }
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
        allWpMenuItem(filter: {locations: {eq: GATSBY_HEADER_MENU}}) {
          nodes {
            key: id
            parentId
            title: label
            url: uri
            order
          }
        }
    }      
    `).allWpMenuItem.nodes);

    return (
        <div>
            <ul>
                {createMenu(menuItems)}
            </ul>
        </div>

    )
}

export default Navigation