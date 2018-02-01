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
      selectedVideo: window.exampleVideoData[0],
      autoPlay: 0
      
    };



  }
  selectVideo (props) {
    this.setState({
      selectedVideo: props
    });
  }
  
  populateResults (searchResults) {

    this.setState({
      videos: searchResults,
      selectedVideo: searchResults[0]
      
    });
  }
  
  liveResult() {    
    
      if ($('.form-control').val() !== undefined && $('.form-control').val().length > 0){
        this.handleSearch();
      }
    
  }
  
  handleSearch (event) {
    //if searchbar is not of zero length, 
    //kick off handleSearch with at a setInterval()
    var options = {
      part: 'snippet',
      order: 'relevance',
      maxResults: 5,
      q: $('.form-control').val() !== undefined ? $('.form-control').val() : 'react',
      key: window.YOUTUBE_API_KEY,      
      embeddable: true,      
    };    
    

    window.searchYouTube(options, this.populateResults.bind(this));
    if (event === 'search') {
      $('.form-control').val('');  
      
    }
  }
  
  toggleAutoPlay() {
    var $autoplay = $('#autoPlayCb');
    if ($autoplay.prop('checked')) {
      this.setState({
        autoPlay: 1
      });
    } else {
      this.setState({
        autoPlay: 0
      });
    }    
  }
  
  
  getVideoDetails(data) {
    var $button = $('#getDetailsBtn');
    var options = {
      id: data,
      part: 'statistics',
      key: window.YOUTUBE_API_KEY
    };    
    $button.on('click',function() {
      window.searchYouTube(options,function() {
      console.log('hi');
    } , 'videos')  
    })
    }
//  "kind": "youtube#videoListResponse",
//  "etag": "\"Wu2llbfqCdxIVjGbVPm2DslKPCA/Md1HiRdMYZD3areGYlM09xscykk\"",
//  "pageInfo": {
//   "totalResults": 1,
//   "resultsPerPage": 1
//  },
//  "items": [
//   {
//    "kind": "youtube#video",
//    "etag": "\"Wu2llbfqCdxIVjGbVPm2DslKPCA/a5BwqQ8RNO-dF0kdvNXa7_w8qfU\"",
//    "id": "418_r0YYB6w",
//    "contentDetails": {
//     "duration": "PT13M40S",
//     "dimension": "2d",
//     "definition": "hd",
//     "caption": "false",
//     "licensedContent": true,
//     "projection": "rectangular"
//    },
//    "statistics": {
//     "viewCount": "43841107",
//     "likeCount": "43217",
//     "dislikeCount": "15267",
//     "favoriteCount": "0"
//    }
//   }
//  ]
// }

    
    
    
    // this.props.selectedVideo.video.id.videoId
    
   
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search  handleSearch={this.handleSearch.bind(this)} toggleAutoPlay={this.toggleAutoPlay.bind(this)} liveResult={this.liveResult.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.selectedVideo} autoPlay={this.state.autoPlay} getVideoDetails={this.getVideoDetails.bind(this)}/>
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




