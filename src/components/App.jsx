// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <div><h5><em>videoPlayer</em> view goes here</h5></div>
//       </div>
//       <div className="col-md-5">
//         <div><h5><em>videoList</em> view goes here</h5></div>
//       </div>
//     </div>
//   </div>
// );

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined

class App extends React.Component {
  constructor() {
    console.log(window);
    super();
    
    this.state = {
      videos: window.exampleVideoData,
      selectedVideo: window.exampleVideoData[0]
      
    };

  }
  selectVideo (props) {
    this.setState({
      selectedVideo: props
    });
  }
  
  populateResults (searchResults) {
    console.log(searchResults);
    this.setState({
      videos: searchResults
    });
  }
  
  handleSearch (query) {
    var options = {
      part: 'snippet',
      order: 'relevance',
      maxResults: 5,
      q: query,
      key: window.YOUTUBE_API_KEY,      
      embeddable: true,      
    };    
    
    $('.form-control').val('');
    var searchresult = window.searchYouTube(options, this.populateResults.bind(this))
    console.log(searchresult)
    this.setState({
      videos: searchresult
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search  handleSearch={this.handleSearch.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.selectedVideo} />
          </div>
          <div className="col-md-5">
            <VideoList selectVideo={this.selectVideo.bind(this)} videos={this.state.videos}/>
          </div>
        </div>
      </div>
      
    );
  }
}
window.App = App;
