import React from "react";

const Pagination = ({page,setPage}) => {


  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nexthandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  console.log('pp',page);
  
  return (
    <div>
      <button onClick={previousHandler}>previous</button>
      <p style={{color:page ===1 ? 'red': "inherit"}}>1</p>
     
      <p>2</p>

      {page > 2 && page <9 && (
        <>
         <span>...</span>
         <p>{page}</p>
        </>
      )}
      <span>...</span>
      <p>9</p>
      <p>10</p>

      <button onClick={nexthandler}>next</button>
    </div>
  );
};

export default Pagination;
