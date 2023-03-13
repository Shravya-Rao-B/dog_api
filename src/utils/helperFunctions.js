const _ = require("lodash"); 

export const sortDogs = (allDogs, sortBy="name", sortOrder='asc') => {
let sortedArray = _.orderBy(allDogs, [sortBy], [sortOrder])
return sortedArray;
}

export const formatObj = (objArray) => {
let formattedArray =  objArray.map(item => (
    {
    ...item,
    heightFormatted: item.height.metric ? Number(item.height.metric.split(" ")[0]) : null,
    lifeSpanFormatted:item.life_span ? Number(item.life_span.split(" ")[0]): null
}))
return formattedArray;
}

export const debounce = (func) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(args)
      }, 1000);
    };
  };