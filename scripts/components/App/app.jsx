import Unsplash, { toJson } from 'unsplash-js';
import { throttle } from 'lodash';

import React from 'react';
import Gallery from '../Gallery/gallery';

class App extends React.Component {
  /* container component */
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      page: 1,
      order: 'original'
    };
  }

  componentDidMount() {
    this.loadContent();
    this.onScroll = throttle(this.onScroll, 1000);
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll() {
    if (document.body.scrollTop >= document.body.scrollTopMax - 50) {
      this.loadContent();
    }
  }

  sortPhotos() {
    switch (this.state.order) {
      case 'original':
        this.setState({
          order: 'ascending'
        });
        break;
      case 'ascending':
        this.setState({
          order: 'descending'
        });
        break;
      case 'descending':
        this.setState({
          order: 'original'
        });
        break;
      default:
        break;
    }
  }

  loadContent() {
    const unsplash = new Unsplash({
      applicationId: '',
      secret: '',
      callbackUrl: 'http://www.vizzuality.com/'
    });

    const keywords = ['earth', 'nature', 'sky', 'landscape', 'aerial', 'travel'];

    unsplash.search
      .photos(keywords[Math.floor(Math.random() * keywords.length)], this.state.page)
      .then(toJson)
      .then(r => {
        this.setState({
          photos: Array.prototype.concat(this.state.photos, r.results),
          page: this.state.page + 1
        });
      });
    // .catch(e => console.error(e));
  }

  render() {
    const options = {
      ascending: this.state.photos.concat().sort((a, b) => a.user.name.localeCompare(b.user.name)),
      descending: this.state.photos
        .concat()
        .sort((a, b) => a.user.name.localeCompare(b.user.name))
        .reverse(),
      original: this.state.photos
    };

    return (
      <main className="content" onScroll={() => this.loadContent()}>
        <div className="wrapper">
          <div className="logo" />
          <button className="sort" onClick={() => this.sortPhotos()}>
            Sort by artist (a-z): {this.state.order}
          </button>
          <Gallery photos={options[this.state.order]} onScroll={this.onScroll} />
        </div>
      </main>
    );
  }
}

export default App;
