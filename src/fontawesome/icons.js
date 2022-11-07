import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brand from '@fortawesome/free-brands-svg-icons';

const libraries = {
    "fa-regular": regular,
    "fa-solid": solid,
    "fa-brands": brand,
};

export const getIcon = (library, value) => {
    const x = value?.split("-");
    const newItem = x.map((item, index) => {
        if(index !== 0) item = item[0].toUpperCase()+item.slice(1);
        return item;
    });

    return libraries[library][newItem.join("")];
} 

