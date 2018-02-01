var Search = (props) => {
  
  
  // var searchCriteria = $('.form-control').val();

   
  return (
    <div className="search-bar form-inline">
      <input onKeyDown={ (e) => e.key === 'Enter' ? props.handleSearch('search'): props.liveResult()}  className="form-control" type="text" />
      <button onClick={() => props.handleSearch('search')} className="btn hidden-sm-down">
        <span className="glyphicon glyphicon-search"></span>
      </button>
      <input onClick={() => props.toggleAutoPlay()} id="autoPlayCb" type="checkbox" text="Toggle" />
      <label for="autoPlayCb">AutoPlay</label>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
